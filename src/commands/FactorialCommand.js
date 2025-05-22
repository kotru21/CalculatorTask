import { Command } from './Command';
import { factorial } from '../utils/mathUtils';

/**
 * Команда для вычисления факториала
 */
export class FactorialCommand extends Command {
  /**
   * @param {number} value - аргумент
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление факториала
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    this.result = factorial(this.value);
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
