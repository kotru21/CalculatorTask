import { EventHandler } from '../../src/core/EventHandler';

// Мокируем Display
const mockDisplay = {
  update: jest.fn(),
  updateExpression: jest.fn(),
  addToHistory: jest.fn(),
  showMemoryIndicator: jest.fn(),
  hideMemoryIndicator: jest.fn(),
};

// Мокируем DOM элементы
const mockButton = {
  addEventListener: jest.fn(),
  getAttribute: jest.fn(),
  tabIndex: 0,
  focus: jest.fn(),
};

const mockCalculator = {
  tabIndex: 0,
  focus: jest.fn(),
};

// Мокируем DOM
Object.defineProperty(document, 'querySelectorAll', {
  writable: true,
  value: jest.fn(() => [mockButton]),
});

Object.defineProperty(document, 'querySelector', {
  writable: true,
  value: jest.fn(() => mockCalculator),
});

Object.defineProperty(document, 'addEventListener', {
  writable: true,
  value: jest.fn(),
});

describe('EventHandler', () => {
  let eventHandler;

  beforeEach(() => {
    jest.clearAllMocks();
    eventHandler = new EventHandler(mockDisplay);
    // Мокируем методы родительского класса
    eventHandler.handleOperationInput = jest.fn();
    eventHandler.handleMemoryOperation = jest.fn();
    eventHandler.updateDisplay = jest.fn();
    eventHandler.undo = jest.fn();
  });

  describe('setupEventListeners', () => {
    test('должен добавить обработчики для кнопок с цифрами', () => {
      mockButton.getAttribute.mockReturnValue('5');

      eventHandler.setupEventListeners();

      expect(document.querySelectorAll).toHaveBeenCalledWith('.btn.number');
      expect(mockButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('должен добавить обработчики для кнопок операций', () => {
      mockButton.getAttribute.mockReturnValue('add');

      eventHandler.setupEventListeners();

      expect(document.querySelectorAll).toHaveBeenCalledWith('.btn.operation');
      expect(mockButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('должен добавить обработчики для кнопок памяти', () => {
      mockButton.getAttribute.mockReturnValue('mc');

      eventHandler.setupEventListeners();

      expect(document.querySelectorAll).toHaveBeenCalledWith('.btn.memory');
      expect(mockButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    test('должен настроить фокус на калькуляторе', () => {
      eventHandler.setupEventListeners();

      expect(document.querySelector).toHaveBeenCalledWith('.calculator');
      expect(mockCalculator.tabIndex).toBe(0);
      expect(mockCalculator.focus).toHaveBeenCalled();
    });

    test('должен добавить обработчик клавиатуры', () => {
      eventHandler.setupEventListeners();

      expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  describe('keyboard event handling', () => {
    let keydownHandler;

    beforeEach(() => {
      eventHandler.setupEventListeners();
      const [, keydownCall] = document.addEventListener.mock.calls.find(
        (call) => call[0] === 'keydown'
      );
      keydownHandler = keydownCall;
    });

    test('должен обрабатывать ввод цифр с клавиатуры', () => {
      const event = { key: '5' };
      jest.spyOn(eventHandler, 'handleNumberInput');

      keydownHandler(event);

      expect(eventHandler.handleNumberInput).toHaveBeenCalledWith('5');
    });

    test('должен обрабатывать ввод точки с клавиатуры', () => {
      const event = { key: '.' };
      jest.spyOn(eventHandler, 'handleNumberInput');

      keydownHandler(event);

      expect(eventHandler.handleNumberInput).toHaveBeenCalledWith('.');
    });

    test('должен обрабатывать операцию сложения', () => {
      const event = { key: '+' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('add');
    });

    test('должен обрабатывать операцию вычитания', () => {
      const event = { key: '-' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('subtract');
    });

    test('должен обрабатывать операцию умножения', () => {
      const event = { key: '*' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('multiply');
    });

    test('должен обрабатывать операцию деления и предотвращать поведение по умолчанию', () => {
      const event = { key: '/', preventDefault: jest.fn() };

      keydownHandler(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('divide');
    });

    test('должен обрабатывать операцию процента', () => {
      const event = { key: '%' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('percent');
    });

    test('должен обрабатывать клавишу Enter для вычисления', () => {
      const event = { key: 'Enter' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('calculate');
    });

    test('должен обрабатывать клавишу = для вычисления', () => {
      const event = { key: '=' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('calculate');
    });

    test('должен обрабатывать клавишу Escape для очистки', () => {
      const event = { key: 'Escape' };

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('clear');
    });

    test('должен обрабатывать Ctrl+Z для отмены', () => {
      const event = { key: 'z', ctrlKey: true };

      keydownHandler(event);

      expect(eventHandler.undo).toHaveBeenCalled();
    });

    test('не должен реагировать на неподдерживаемые клавиши', () => {
      const event = { key: 'a' };
      jest.spyOn(eventHandler, 'handleNumberInput');

      keydownHandler(event);

      expect(eventHandler.handleOperationInput).not.toHaveBeenCalled();
      expect(eventHandler.handleNumberInput).not.toHaveBeenCalled();
    });
  });

  describe('handleNumberInput', () => {
    beforeEach(() => {
      eventHandler.updateDisplay = jest.fn();
    });

    test('должен обрабатывать ввод цифр', () => {
      eventHandler.handleNumberInput('5');
      expect(eventHandler.currentValue).toBe('5');
      expect(eventHandler.updateDisplay).toHaveBeenCalled();
    });

    test('должен обрабатывать ввод точки', () => {
      eventHandler.handleNumberInput('.');
      expect(eventHandler.currentValue).toBe('0.');
    });

    test('не должен добавлять вторую точку', () => {
      eventHandler.currentValue = '3.14';
      eventHandler.handleNumberInput('.');
      expect(eventHandler.currentValue).toBe('3.14');
    });

    test('должен сбрасывать ввод после операции', () => {
      eventHandler.resetInput = true;
      eventHandler.handleNumberInput('7');
      expect(eventHandler.currentValue).toBe('7');
      expect(eventHandler.resetInput).toBe(false);
    });

    test('должен заменять 0 на новую цифру', () => {
      eventHandler.currentValue = '0';
      eventHandler.handleNumberInput('5');
      expect(eventHandler.currentValue).toBe('5');
    });

    test('должен добавлять цифру к существующему числу', () => {
      eventHandler.currentValue = '12';
      eventHandler.handleNumberInput('3');
      expect(eventHandler.currentValue).toBe('123');
    });

    test('должен правильно обрабатывать точку после resetInput', () => {
      eventHandler.resetInput = true;
      eventHandler.handleNumberInput('.');
      expect(eventHandler.currentValue).toBe('0.');
      expect(eventHandler.resetInput).toBe(false);
    });
  });

  describe('backspace', () => {
    test('должен правильно обрабатывать backspace', () => {
      eventHandler.currentValue = '123';
      eventHandler.backspace();
      expect(eventHandler.currentValue).toBe('12');
    });

    test('должен устанавливать 0 при backspace последней цифры', () => {
      eventHandler.currentValue = '5';
      eventHandler.backspace();
      expect(eventHandler.currentValue).toBe('0');
    });

    test('должен обрабатывать backspace при ошибке', () => {
      eventHandler.currentValue = 'Error';
      eventHandler.backspace();
      expect(eventHandler.currentValue).toBe('0');
      expect(eventHandler.resetInput).toBe(false);
    });

    test('должен обрабатывать backspace при resetInput', () => {
      eventHandler.resetInput = true;
      eventHandler.backspace();
      expect(eventHandler.currentValue).toBe('0');
      expect(eventHandler.resetInput).toBe(false);
    });

    test('должен правильно обрабатывать backspace для одной цифры', () => {
      eventHandler.currentValue = '7';
      eventHandler.backspace();
      expect(eventHandler.currentValue).toBe('0');
    });
  });

  describe('event handler callbacks', () => {
    test('должен вызывать handleNumberInput при клике на кнопку цифры', () => {
      // Настраиваем мок для кнопок цифр
      const numberButton = {
        ...mockButton,
        addEventListener: jest.fn(),
        getAttribute: jest.fn().mockReturnValue('8'),
      };

      document.querySelectorAll.mockImplementation((selector) => {
        if (selector === '.btn.number') return [numberButton];
        return [];
      });

      jest.spyOn(eventHandler, 'handleNumberInput');

      eventHandler.setupEventListeners();

      // Получаем callback функцию и вызываем её
      const callback = numberButton.addEventListener.mock.calls.find(
        (call) => call[0] === 'click'
      )[1];
      callback();

      expect(eventHandler.handleNumberInput).toHaveBeenCalledWith('8');
    });

    test('должен вызывать handleOperationInput при клике на кнопку операции', () => {
      // Настраиваем мок для кнопок операций
      const operationButton = {
        ...mockButton,
        addEventListener: jest.fn(),
        getAttribute: jest.fn().mockReturnValue('multiply'),
      };

      document.querySelectorAll.mockImplementation((selector) => {
        if (selector === '.btn.operation') return [operationButton];
        return [];
      });

      eventHandler.setupEventListeners();

      // Получаем callback функцию для операций
      const callback = operationButton.addEventListener.mock.calls.find(
        (call) => call[0] === 'click'
      )[1];
      callback();

      expect(eventHandler.handleOperationInput).toHaveBeenCalledWith('multiply');
    });

    test('должен вызывать handleMemoryOperation при клике на кнопку памяти', () => {
      // Настраиваем мок для кнопок памяти
      const memoryButton = {
        ...mockButton,
        addEventListener: jest.fn(),
        getAttribute: jest.fn().mockReturnValue('ms'),
      };

      document.querySelectorAll.mockImplementation((selector) => {
        if (selector === '.btn.memory') return [memoryButton];
        return [];
      });

      eventHandler.setupEventListeners();

      // Получаем callback функцию для памяти
      const callback = memoryButton.addEventListener.mock.calls.find(
        (call) => call[0] === 'click'
      )[1];
      callback();

      expect(eventHandler.handleMemoryOperation).toHaveBeenCalledWith('ms');
    });
  });
});
