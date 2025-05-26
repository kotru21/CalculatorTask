import { Command } from './Command';
import { sqrt } from '../utils/mathUtils';

/**
 * Команда для вычисления квадратного корня
 */
export class SqrtCommand extends Command {
  /**
   * @param {number} value - значение для извлечения корня
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление квадратного корня
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    if (this.value < 0) {
      return 'Error'; // Корень из отрицательного числа
    }

    this.result = sqrt(this.value);
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
