import { Command } from './Command';
import { sin, PI } from '../utils/mathUtils';

/**
 * Команда для вычисления синуса
 */
export class SinCommand extends Command {
  /**
   * @param {number} value - значение в градусах
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление синуса
   * @returns {number} результат
   */
  execute() {
    // Преобразуем из градусов в радианы
    const radians = this.value * (PI / 180);
    this.result = sin(radians);
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
