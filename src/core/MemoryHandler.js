import { OperationsHandler } from './OperationsHandler';
import { formatNumber } from '../utils/formatter';

/**
 * Класс для работы с памятью калькулятора
 */
export class MemoryHandler extends OperationsHandler {
  /**
   * Обрабатывает операции с памятью
   */
  handleMemoryOperation(operation) {
    // Преобразование текущего значения в число
    const currentValueAsNumber = parseFloat(this.currentValue);

    // Проверка на корректное числовое значение
    const isValidNumber = !Number.isNaN(currentValueAsNumber);

    switch (operation) {
      case 'mc': // Memory Clear
        this.memoryValue = 0;
        this.hasMemory = false;
        this.display.hideMemoryIndicator();
        break;

      case 'mr': // Memory Recall
        if (this.hasMemory) {
          this.currentValue = formatNumber(this.memoryValue);
          this.resetInput = true;
          this.updateDisplay();
        }
        break;

      case 'm-plus': // Memory Add
        if (isValidNumber) {
          this.memoryValue += currentValueAsNumber;
          this.hasMemory = true;
          this.display.showMemoryIndicator();
          // Показываем пользователю, что значение было добавлено в память
          this.display.updateExpression(`M: ${formatNumber(this.memoryValue)}`);
          setTimeout(() => {
            this.display.updateExpression('');
          }, 1000);
        }
        break;

      case 'm-minus': // Memory Subtract
        if (isValidNumber) {
          this.memoryValue -= currentValueAsNumber;
          this.hasMemory = true;
          this.display.showMemoryIndicator();
          // Показываем пользователю, что значение было вычтено из памяти
          this.display.updateExpression(`M: ${formatNumber(this.memoryValue)}`);
          setTimeout(() => {
            this.display.updateExpression('');
          }, 1000);
        }
        break;

      default:
        // Ничего не делаем для неизвестных операций с памятью
        break;
    }
  }
}
