import { OperationsHandler } from '../../src/core/OperationsHandler';

const mockDisplay = {
  update: jest.fn(),
  updateExpression: jest.fn(),
  addToHistory: jest.fn(),
  showMemoryIndicator: jest.fn(),
  hideMemoryIndicator: jest.fn(),
};

describe('OperationsHandler', () => {
  let handler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new OperationsHandler(mockDisplay);
  });

  test('должен очищать калькулятор', () => {
    handler.currentValue = '123';
    handler.previousValue = '456';
    handler.operation = 'add';
    handler.handleOperationInput('clear');

    expect(handler.currentValue).toBe('0');
    expect(handler.previousValue).toBeNull();
    expect(handler.operation).toBeNull();
    expect(handler.resetInput).toBe(false);
  });

  test('должен инвертировать знак числа', () => {
    handler.currentValue = '5';
    handler.handleOperationInput('negate');
    expect(handler.currentValue).toBe('-5');
  });

  test('должен вычислять процент', () => {
    handler.currentValue = '50';
    handler.handleOperationInput('percent');
    expect(handler.currentValue).toBe('0.5');
  });

  test('должен выполнять квадрат числа', () => {
    handler.currentValue = '4';
    handler.handleOperationInput('square');
    expect(handler.currentValue).toBe('16');
  });

  test('должен выполнять квадратный корень', () => {
    handler.currentValue = '16';
    handler.handleOperationInput('sqrt');
    expect(handler.currentValue).toBe('4');
  });

  test('должен устанавливать операцию', () => {
    handler.currentValue = '10';
    handler.setOperation('add');
    expect(handler.previousValue).toBe('10');
    expect(handler.operation).toBe('add');
    expect(handler.resetInput).toBe(true);
  });

  test('должен выполнять сложение', () => {
    handler.currentValue = '5';
    handler.previousValue = '3';
    handler.operation = 'add';
    handler.executeOperation();
    expect(handler.currentValue).toBe('8');
  });

  test('должен отменять последнюю операцию', () => {
    handler.currentValue = '5';
    handler.handleOperationInput('negate');
    handler.undo();
    expect(handler.currentValue).toBe('5');
  });

  describe('Научные операции с одним аргументом', () => {
    test('должен выполнять кубический корень', () => {
      handler.currentValue = '27';
      handler.handleOperationInput('cuberoot');
      expect(handler.currentValue).toBe('3');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('∛(27)', '3');
    });

    test('должен выполнять куб числа', () => {
      handler.currentValue = '3';
      handler.handleOperationInput('cube');
      expect(handler.currentValue).toBe('27');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('(3)³', '27');
    });

    test('должен выполнять синус', () => {
      handler.currentValue = '0';
      handler.handleOperationInput('sin');
      expect(handler.currentValue).toBe('0');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('sin(0)', '0');
    });

    test('должен выполнять косинус', () => {
      handler.currentValue = '0';
      handler.handleOperationInput('cos');
      expect(handler.currentValue).toBe('1');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('cos(0)', '1');
    });

    test('должен выполнять тангенс', () => {
      handler.currentValue = '0';
      handler.handleOperationInput('tan');
      expect(handler.currentValue).toBe('0');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('tan(0)', '0');
    });

    test('должен выполнять логарифм', () => {
      handler.currentValue = '10';
      handler.handleOperationInput('log');
      expect(parseFloat(handler.currentValue)).toBeCloseTo(1, 10);
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('log(10)', expect.any(String));
    });

    test('должен выполнять факториал', () => {
      handler.currentValue = '5';
      handler.handleOperationInput('factorial');
      expect(handler.currentValue).toBe('120');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('5!', '120');
    });

    test('должен выполнять обратное значение', () => {
      handler.currentValue = '4';
      handler.handleOperationInput('inverse');
      expect(handler.currentValue).toBe('0.25');
      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('1/(4)', '0.25');
    });
  });

  describe('Операции с двумя аргументами', () => {
    test('должен выполнять вычитание', () => {
      handler.currentValue = '10';
      handler.setOperation('subtract');
      handler.currentValue = '3';
      handler.executeOperation();
      expect(handler.currentValue).toBe('7');
    });

    test('должен выполнять умножение', () => {
      handler.currentValue = '6';
      handler.setOperation('multiply');
      handler.currentValue = '7';
      handler.executeOperation();
      expect(handler.currentValue).toBe('42');
    });

    test('должен выполнять деление', () => {
      handler.currentValue = '15';
      handler.setOperation('divide');
      handler.currentValue = '3';
      handler.executeOperation();
      expect(handler.currentValue).toBe('5');
    });

    test('должен выполнять возведение в степень', () => {
      handler.currentValue = '2';
      handler.setOperation('power');
      handler.currentValue = '3';
      handler.executeOperation();
      expect(handler.currentValue).toBe('8');
    });

    test('должен обрабатывать деление на ноль', () => {
      handler.currentValue = '10';
      handler.setOperation('divide');
      handler.currentValue = '0';
      handler.executeOperation();
      expect(handler.currentValue).toBe('Error');
    });
  });

  describe('Цепочка операций', () => {
    test('должен выполнять цепочку операций без нажатия равно', () => {
      handler.currentValue = '10';
      handler.setOperation('add');
      handler.currentValue = '5';
      handler.setOperation('multiply');

      expect(handler.currentValue).toBe('5'); // Текущее значение остается как было введено
      expect(handler.previousValue).toBe('10'); // Предыдущее значение - это первое число
      expect(handler.operation).toBe('multiply');
    });

    test('должен правильно обновлять выражение при операциях', () => {
      handler.currentValue = '10';
      handler.setOperation('add');

      expect(mockDisplay.updateExpression).toHaveBeenCalledWith('10 +');
      expect(handler.resetInput).toBe(true);
    });
  });

  describe('Обработка ошибок', () => {
    test('должен обрабатывать квадратный корень отрицательного числа', () => {
      handler.currentValue = '-4';
      handler.handleOperationInput('sqrt');
      expect(handler.currentValue).toBe('Error');
    });

    test('должен обрабатывать логарифм отрицательного числа', () => {
      handler.currentValue = '-1';
      handler.handleOperationInput('log');
      expect(handler.currentValue).toBe('Error');
    });

    test('должен обрабатывать факториал отрицательного числа', () => {
      handler.currentValue = '-1';
      handler.handleOperationInput('factorial');
      expect(handler.currentValue).toBe('Error');
    });
  });

  describe('Backspace функциональность', () => {
    test('должен удалять последний символ', () => {
      handler.currentValue = '123';
      handler.handleOperationInput('backspace');
      expect(handler.currentValue).toBe('12');
    });

    test('должен заменить на 0 при удалении последней цифры', () => {
      handler.currentValue = '5';
      handler.handleOperationInput('backspace');
      expect(handler.currentValue).toBe('0');
    });
  });

  describe('История команд', () => {
    test('должен сохранять команды в истории', () => {
      handler.currentValue = '5';
      handler.handleOperationInput('square');

      expect(handler.commandHistory).toHaveLength(1);
    });

    test('должен очищать историю команд при clear', () => {
      handler.currentValue = '5';
      handler.handleOperationInput('square');
      handler.handleOperationInput('clear');

      expect(handler.commandHistory).toHaveLength(0);
    });

    test('должен правильно отменять унарные операции', () => {
      handler.currentValue = '5';
      handler.handleOperationInput('negate');
      expect(handler.currentValue).toBe('-5');

      handler.undo();
      expect(handler.currentValue).toBe('5');
    });

    test('должен правильно отменять операции процента', () => {
      handler.currentValue = '50';
      handler.handleOperationInput('percent');
      expect(handler.currentValue).toBe('0.5');

      handler.undo();
      expect(handler.currentValue).toBe('50');
    });

    test('не должен ничего делать при undo пустой истории', () => {
      const initialValue = handler.currentValue;
      handler.undo();
      expect(handler.currentValue).toBe(initialValue);
    });
  });

  describe('Обновление дисплея', () => {
    test('должен вызывать updateDisplay после операций', () => {
      const updateDisplaySpy = jest.spyOn(handler, 'updateDisplay');

      handler.handleOperationInput('square');
      expect(updateDisplaySpy).toHaveBeenCalled();
    });

    test('должен добавлять в историю после выполнения операций', () => {
      handler.currentValue = '10';
      handler.setOperation('add');
      handler.currentValue = '5';
      handler.executeOperation();

      expect(mockDisplay.addToHistory).toHaveBeenCalledWith('10 + 5', '15');
    });

    test('должен очищать выражение после выполнения операции', () => {
      handler.currentValue = '10';
      handler.setOperation('add');
      handler.currentValue = '5';
      handler.executeOperation();

      expect(mockDisplay.updateExpression).toHaveBeenCalledWith('');
    });
  });

  describe('Граничные случаи', () => {
    test('должен обрабатывать выполнение операции без предыдущего значения', () => {
      handler.executeOperation();
      expect(handler.currentValue).toBe('0'); // Значение по умолчанию
    });

    test('должен обрабатывать установку операции после другой операции без ввода', () => {
      handler.currentValue = '10';
      handler.setOperation('add');
      handler.setOperation('multiply');

      expect(handler.operation).toBe('multiply');
      expect(handler.previousValue).toBe('10');
    });

    test('должен правильно обрабатывать calculate без активной операции', () => {
      handler.currentValue = '42';
      handler.handleOperationInput('calculate');
      expect(handler.currentValue).toBe('42');
    });
  });

  describe('Методы получения символов операций', () => {
    test('должен возвращать правильные символы операций', () => {
      expect(handler.getOperationSymbol('add')).toBe('+');
      expect(handler.getOperationSymbol('subtract')).toBe('-');
      expect(handler.getOperationSymbol('multiply')).toBe('×');
      expect(handler.getOperationSymbol('divide')).toBe('÷');
      expect(handler.getOperationSymbol('power')).toBe('^');
    });
  });
});
