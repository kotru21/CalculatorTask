/**
 * Класс для управления отображением калькулятора
 */
export class Display {
  constructor() {
    this.resultElement = null;
    this.expressionElement = null;
    this.memoryIndicatorElement = null;
    this.historyElement = null;
  }

  /**
   * Инициализирует дисплей
   */
  init() {
    this.resultElement = document.getElementById('result');
    this.expressionElement = document.getElementById('expression');
    this.memoryIndicatorElement = document.getElementById('memory-indicator');
    this.historyElement = document.getElementById('history-list');
  }

  /**
   * Обновляет отображаемое значение
   * @param {string} value - значение для отображения
   */
  update(value) {
    if (this.resultElement) {
      this.resultElement.textContent = value;
    }
  }

  /**
   * Обновляет выражение
   * @param {string} expression - выражение для отображения
   */
  updateExpression(expression) {
    if (this.expressionElement) {
      this.expressionElement.textContent = expression;
    }
  }

  /**
   * Показывает индикатор памяти
   */
  showMemoryIndicator() {
    if (this.memoryIndicatorElement) {
      this.memoryIndicatorElement.textContent = 'M';
    }
  }

  /**
   * Скрывает индикатор памяти
   */
  hideMemoryIndicator() {
    if (this.memoryIndicatorElement) {
      this.memoryIndicatorElement.textContent = '';
    }
  }

  /**
   * Добавляет запись в историю
   * @param {string} expression - выражение
   * @param {string} result - результат
   */
  addToHistory(expression, result) {
    if (this.historyElement) {
      const historyItem = document.createElement('li');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <span class="history-expression">${expression}</span>
        <span class="history-result">${result}</span>
      `;
      historyItem.setAttribute('data-result', result);

      // Добавляем обработчик для возможности использовать результат
      historyItem.addEventListener('click', () => {
        if (window.calculator) {
          window.calculator.setCurrentValue(result);
        }
      });

      this.historyElement.prepend(historyItem);

      // Ограничиваем историю 10 последними операциями
      if (this.historyElement.children.length > 10) {
        this.historyElement.removeChild(this.historyElement.lastChild);
      }
    }
  }
}
