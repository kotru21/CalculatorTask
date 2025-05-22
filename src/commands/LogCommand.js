import { Command } from './Command';
import { log10 } from '../utils/mathUtils';

/**
 * Команда для вычисления логарифма по основанию 10
 */
export class LogCommand extends Command {
  /**
   * @param {number} value - аргумент
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление логарифма
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
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
