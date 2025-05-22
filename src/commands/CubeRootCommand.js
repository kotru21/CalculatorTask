import { Command } from './Command';
import { cubeRoot } from '../utils/mathUtils';

/**
 * Команда для извлечения кубического корня
 */
export class CubeRootCommand extends Command {
  /**
   * @param {number} value - число, из которого извлекаем кубический корень
   */
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  /**
   * Выполняет вычисление кубического корня
   * @returns {number|string} результат или сообщение об ошибке
   */
  execute() {
    this.result = cubeRoot(this.value);
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
