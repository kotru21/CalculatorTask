import { Command } from './Command';

/**
 * Команда для вычисления факториала
 */
export class FactorialCommand extends Command {
  /**
   * @param {number} value - значение для вычисления факториала
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
    // Проверяем, что число целое и неотрицательное
    if (!Number.isInteger(this.value) || this.value < 0) {
      return 'Error';
    }

    // Ограничиваем вычисления для предотвращения переполнения
    if (this.value > 170) {
      return 'Error'; // Факториал больших чисел приводит к Infinity
    }

    let result = 1;
    for (let i = 2; i <= this.value; i += 1) {
      result *= i;
    }

    this.result = result;
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
