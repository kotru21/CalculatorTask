import { Command } from './Command';
import { log10 } from '../utils/mathUtils';

/**
 * Команда для вычисления логарифма по основанию 10
 */
export class LogCommand extends Command {
  /**
   * @param {number} value - значение для вычисления логарифма
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление логарифма по основанию 10
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    if (this.value <= 0) {
      return 'Error'; // Логарифм определен только для положительных чисел
    }

    this.result = log10(this.value);
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
