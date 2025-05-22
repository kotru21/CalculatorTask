/**
 * Базовый класс калькулятора
 */
export class BaseCalculator {
  constructor(display) {
    this.display = display;
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.resetInput = false;
    this.commandHistory = []; // История команд для отмены
    this.memoryValue = 0; // Значение в памяти
    this.hasMemory = false; // Флаг наличия значения в памяти
    this.operationHistory = []; // История операций для отображения
  }

  /**
   * Обновляет отображение
   */
  updateDisplay() {
    this.display.update(this.currentValue);
  }

  /**
   * Возвращает символ операции для отображения
   */
  getOperationSymbol(operation) {
    const symbols = {
      add: '+',
      subtract: '-',
      multiply: '×',
      divide: '÷',
      power: '^',
      square: '²',
      sqrt: '√',
      cube: '³',
      sin: 'sin',
      cos: 'cos',
      tan: 'tan',
      log: 'log',
      factorial: '!',
    };

    return symbols[operation] || '';
  }

  /**
   * Устанавливает текущее значение
   * @param {string} value - новое значение
   */
  setCurrentValue(value) {
    this.currentValue = value;
    this.resetInput = true;
    this.updateDisplay();
  }
}
