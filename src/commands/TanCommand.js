import { Command } from './Command';
import { tan, PI } from '../utils/mathUtils';

/**
 * Команда для вычисления тангенса
 */
export class TanCommand extends Command {
  /**
   * @param {number} value - значение в градусах
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление тангенса
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    // Преобразуем из градусов в радианы
    const radians = this.value * (PI / 180);
    this.result = tan(radians);
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
