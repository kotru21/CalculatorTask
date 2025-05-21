/**
 * Класс для управления отображением калькулятора
 */
export class Display {
  constructor() {
    this.element = null;
  }

  /**
   * Инициализирует дисплей
   */
  init() {
    this.element = document.getElementById('result');
  }

  /**
   * Обновляет отображаемое значение
   * @param {string} value - значение для отображения
   */
  update(value) {
    if (this.element) {
      this.element.textContent = value;
    }
  }
}
