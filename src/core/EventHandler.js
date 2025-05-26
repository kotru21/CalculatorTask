import { BaseCalculator } from './BaseCalculator';

/**
 * Класс для обработки событий калькулятора
 */
export class EventHandler extends BaseCalculator {
  /**
   * Добавляет обработчики событий
   */
  setupEventListeners() {
    // Обработчики для кнопок с цифрами
    document.querySelectorAll('.btn.number').forEach((button) => {
      button.addEventListener('click', () => {
        this.handleNumberInput(button.getAttribute('data-value'));
      });
    });

    // Обработчики для кнопок с операциями
    document.querySelectorAll('.btn.operation').forEach((button) => {
      button.addEventListener('click', () => {
        this.handleOperationInput(button.getAttribute('data-action'));
      });
    });

    // Обработчики для кнопок памяти
    document.querySelectorAll('.btn.memory').forEach((button) => {
      button.addEventListener('click', () => {
        this.handleMemoryOperation(button.getAttribute('data-action'));
      });
    });

    // Делаем калькулятор доступным для фокуса
    const calculator = document.querySelector('.calculator');
    if (calculator) {
      calculator.tabIndex = 0;
      calculator.focus();
    }

    // Улучшенный обработчик клавиатуры
    document.addEventListener('keydown', (event) => {
      // Обработка цифр и точки
      if (/^[0-9.]$/.test(event.key)) {
        this.handleNumberInput(event.key);
        return;
      }

      // Обработка операций
      switch (event.key) {
        case '+':
          this.handleOperationInput('add');
          break;
        case '-':
          this.handleOperationInput('subtract');
          break;
        case '*':
          this.handleOperationInput('multiply');
          break;
        case '/':
          event.preventDefault(); // Предотвращает открытие поиска в браузере
          this.handleOperationInput('divide');
          break;
        case '%':
          this.handleOperationInput('percent');
          break;
        case 'Enter':
        case '=':
          this.handleOperationInput('calculate');
          break;
        case 'Escape':
          this.handleOperationInput('clear');
          break;
        case 'Backspace':
          this.backspace();
          break;
        case 'z':
          if (event.ctrlKey) {
            this.undo();
          }
          break;
        default:
          // Ничего не делаем для неподдерживаемых клавиш
          break;
      }
    });
  }

  /**
   * Обрабатывает ввод цифр
   */
  handleNumberInput(digit) {
    if (this.resetInput) {
      this.currentValue = digit === '.' ? '0.' : digit;
      this.resetInput = false;
    } else {
      // Проверка ввода для корректности
      if (digit === '.' && this.currentValue.includes('.')) {
        return; // Предотвращаем добавление второй точки
      }

      this.currentValue =
        this.currentValue === '0' && digit !== '.' ? digit : this.currentValue + digit;
    }

    this.updateDisplay();
  }

  /**
   * Удаляет последний символ
   */
  backspace() {
    if (this.currentValue === 'Error' || this.resetInput) {
      this.currentValue = '0';
      this.resetInput = false;
    } else if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
    } else {
      this.currentValue = '0';
    }
  }
}
