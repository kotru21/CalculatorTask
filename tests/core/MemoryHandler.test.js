import { MemoryHandler } from '../../src/core/MemoryHandler';

const mockDisplay = {
  update: jest.fn(),
  updateExpression: jest.fn(),
  addToHistory: jest.fn(),
  showMemoryIndicator: jest.fn(),
  hideMemoryIndicator: jest.fn(),
};

describe('MemoryHandler', () => {
  let handler;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = new MemoryHandler(mockDisplay);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('должен очищать память (MC)', () => {
    handler.memoryValue = 10;
    handler.hasMemory = true;
    handler.handleMemoryOperation('mc');

    expect(handler.memoryValue).toBe(0);
    expect(handler.hasMemory).toBe(false);
    expect(mockDisplay.hideMemoryIndicator).toHaveBeenCalled();
  });

  test('должен вызывать значение из памяти (MR)', () => {
    handler.memoryValue = 25;
    handler.hasMemory = true;
    handler.handleMemoryOperation('mr');

    expect(handler.currentValue).toBe('25');
    expect(handler.resetInput).toBe(true);
    expect(mockDisplay.update).toHaveBeenCalledWith('25');
  });

  test('не должен вызывать значение из пустой памяти', () => {
    handler.hasMemory = false;
    const originalValue = handler.currentValue;
    handler.handleMemoryOperation('mr');

    expect(handler.currentValue).toBe(originalValue);
  });

  test('должен добавлять к памяти (M+)', () => {
    handler.memoryValue = 10;
    handler.currentValue = '5';
    handler.handleMemoryOperation('m-plus');

    expect(handler.memoryValue).toBe(15);
    expect(handler.hasMemory).toBe(true);
    expect(mockDisplay.showMemoryIndicator).toHaveBeenCalled();
  });

  test('должен вычитать из памяти (M-)', () => {
    handler.memoryValue = 10;
    handler.currentValue = '3';
    handler.handleMemoryOperation('m-minus');

    expect(handler.memoryValue).toBe(7);
    expect(handler.hasMemory).toBe(true);
    expect(mockDisplay.showMemoryIndicator).toHaveBeenCalled();
  });

  test('должен скрывать выражение через таймаут для M+', () => {
    handler.currentValue = '5';
    handler.handleMemoryOperation('m-plus');

    expect(mockDisplay.updateExpression).toHaveBeenCalledWith('M: 5');

    jest.advanceTimersByTime(1000);

    expect(mockDisplay.updateExpression).toHaveBeenCalledWith('');
  });
});
