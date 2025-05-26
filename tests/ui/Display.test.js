import { Display } from '../../src/ui/Display';

// Мокируем DOM элементы
const mockElements = {
  result: { textContent: '' },
  expression: { textContent: '' },
  'memory-indicator': { textContent: '' },
  'history-list': {
    children: { length: 0 },
    prepend: jest.fn(),
    removeChild: jest.fn(),
    lastChild: null,
  },
};

Object.defineProperty(document, 'getElementById', {
  writable: true,
  value: jest.fn((id) => mockElements[id] || null),
});

Object.defineProperty(document, 'createElement', {
  writable: true,
  value: jest.fn(() => ({
    className: '',
    innerHTML: '',
    setAttribute: jest.fn(),
    addEventListener: jest.fn(),
  })),
});

describe('Display', () => {
  let display;

  beforeEach(() => {
    jest.clearAllMocks();
    display = new Display();

    // Сбрасываем textContent
    Object.values(mockElements).forEach((element) => {
      if (element && element.textContent !== undefined) {
        element.textContent = '';
      }
    });
  });

  test('должен инициализировать элементы DOM', () => {
    display.init();

    expect(display.resultElement).toBe(mockElements.result);
    expect(display.expressionElement).toBe(mockElements.expression);
    expect(display.memoryIndicatorElement).toBe(mockElements['memory-indicator']);
    expect(display.historyElement).toBe(mockElements['history-list']);
  });

  test('должен обновлять отображаемое значение', () => {
    display.init();
    display.update('123');

    expect(mockElements.result.textContent).toBe('123');
  });

  test('должен обновлять выражение', () => {
    display.init();
    display.updateExpression('2 + 3');

    expect(mockElements.expression.textContent).toBe('2 + 3');
  });

  test('должен показывать индикатор памяти', () => {
    display.init();
    display.showMemoryIndicator();

    expect(mockElements['memory-indicator'].textContent).toBe('M');
  });

  test('должен скрывать индикатор памяти', () => {
    display.init();
    display.hideMemoryIndicator();

    expect(mockElements['memory-indicator'].textContent).toBe('');
  });

  test('должен добавлять запись в историю', () => {
    const mockHistoryItem = {
      className: '',
      innerHTML: '',
      setAttribute: jest.fn(),
      addEventListener: jest.fn(),
    };

    document.createElement.mockReturnValue(mockHistoryItem);

    display.init();
    display.addToHistory('2 + 3', '5');

    expect(mockHistoryItem.innerHTML).toContain('2 + 3');
    expect(mockHistoryItem.innerHTML).toContain('5');
    expect(mockHistoryItem.setAttribute).toHaveBeenCalledWith('data-result', '5');
    expect(mockElements['history-list'].prepend).toHaveBeenCalledWith(mockHistoryItem);
  });

  test('не должен обновлять если элементы не инициализированы', () => {
    // Не вызываем init()
    expect(() => {
      display.update('123');
      display.updateExpression('test');
      display.showMemoryIndicator();
      display.hideMemoryIndicator();
      display.addToHistory('test', 'result');
    }).not.toThrow();
  });
});
