import { Command } from './Command';

/**
 * Команда для вычисления обратного значения (1/x)
 */
export class InverseCommand extends Command {
  /**
   * @param {number} value - значение для вычисления обратного
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление обратного значения
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    if (this.value === 0) {
      return 'Error'; // Деление на ноль
    }

    this.result = 1 / this.value;
    return this.result;
  }

  /**
   * Отменяет операцию
   * @returns {number} исходное значение
   */
  undo() {
    return this.originalValue;
  }
}
