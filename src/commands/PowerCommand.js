import { Command } from './Command';
import { power } from '../utils/mathUtils';

/**
 * Команда для возведения в степень
 */
export class PowerCommand extends Command {
  /**
   * @param {number} base - основание
   * @param {number} exponent - показатель степени
   */
  constructor(base, exponent) {
    super();
    this.base = base;
    this.exponent = exponent;
    this.originalBase = base;
    this.originalExponent = exponent;
  }

  /**
   * Выполняет операцию возведения в степень
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    // Проверка особых случаев
    if (this.base === 0 && this.exponent <= 0) {
      return 'Error'; // 0 в отрицательной степени не определено
    }

    this.result = power(this.base, this.exponent);
    return this.result;
  }

  /**
   * Отменяет операцию
   * @returns {number} исходное значение основания
   */
  undo() {
    return this.originalBase;
  }
}
