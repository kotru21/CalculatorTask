import { BaseCalculator } from '../../src/core/BaseCalculator';

// Мокируем Display
const mockDisplay = {
  update: jest.fn(),
  updateExpression: jest.fn(),
  addToHistory: jest.fn(),
  showMemoryIndicator: jest.fn(),
  hideMemoryIndicator: jest.fn(),
};

describe('BaseCalculator', () => {
  let calculator;

  beforeEach(() => {
    jest.clearAllMocks();
    calculator = new BaseCalculator(mockDisplay);
  });

  test('должен инициализироваться с корректными начальными значениями', () => {
    expect(calculator.currentValue).toBe('0');
    expect(calculator.previousValue).toBeNull();
    expect(calculator.operation).toBeNull();
    expect(calculator.resetInput).toBe(false);
    expect(calculator.commandHistory).toEqual([]);
    expect(calculator.memoryValue).toBe(0);
    expect(calculator.hasMemory).toBe(false);
    expect(calculator.operationHistory).toEqual([]);
  });

  test('должен обновлять дисплей', () => {
    calculator.updateDisplay();
    expect(mockDisplay.update).toHaveBeenCalledWith('0');
  });

  test('должен возвращать правильные символы операций', () => {
    expect(calculator.getOperationSymbol('add')).toBe('+');
    expect(calculator.getOperationSymbol('subtract')).toBe('-');
    expect(calculator.getOperationSymbol('multiply')).toBe('×');
    expect(calculator.getOperationSymbol('divide')).toBe('÷');
    expect(calculator.getOperationSymbol('power')).toBe('^');
    expect(calculator.getOperationSymbol('unknown')).toBe('');
  });

  test('должен устанавливать текущее значение', () => {
    calculator.setCurrentValue('123');
    expect(calculator.currentValue).toBe('123');
    expect(calculator.resetInput).toBe(true);
    expect(mockDisplay.update).toHaveBeenCalledWith('123');
  });
});
