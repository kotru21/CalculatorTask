import { Command } from './Command';
import { cos, PI } from '../utils/mathUtils';

/**
 * Команда для вычисления косинуса
 */
export class CosCommand extends Command {
  /**
   * @param {number} value - значение в градусах
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление косинуса
   * @returns {number} результат
   */
  execute() {
    // Преобразуем из градусов в радианы
    const radians = this.value * (PI / 180);
    this.result = cos(radians);
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
