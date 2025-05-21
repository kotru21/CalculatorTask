import { AddCommand } from '../commands/AddCommand';
import { SubtractCommand } from '../commands/SubtractCommand';
import { MultiplyCommand } from '../commands/MultiplyCommand';
import { DivideCommand } from '../commands/DivideCommand';
import { PercentCommand } from '../commands/PercentCommand';
import { NegateCommand } from '../commands/NegateCommand';
import { formatNumber } from '../utils/formatter';

/**
 * Основной класс калькулятора
 */
export class Calculator {
  constructor(display) {
    this.display = display;
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.resetInput = false;
    this.commandHistory = []; // История команд для отмены
  }

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

    // Делаем калькулятор доступным для фокуса
    const calculator = document.querySelector('.calculator');
    if (calculator) {
      calculator.tabIndex = 0;
      calculator.focus();
    }

    // Улучшенный обработчик клавиатуры
    document.addEventListener('keydown', (event) => {
      console.log('Нажата клавиша:', event.key); // Отладка

      // Обработка цифр и точки
      if (/^[0-9.]$/.test(event.key)) {
        this.handleNumberInput(event.key);
        return;
      }

      // Обработка операций
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
   * Обрабатывает операции
   */
  handleOperationInput(operation) {
    switch (operation) {
      case 'clear':
        this.clear();
        break;
      case 'negate':
        this.negate();
        break;
      case 'percent':
        this.percent();
        break;
      case 'calculate':
        this.executeOperation();
        break;
      default:
        this.setOperation(operation);
        break;
    }

    this.updateDisplay();
  }

  /**
   * Устанавливает текущую операцию
   */
  setOperation(operation) {
    if (this.previousValue === null) {
      // Если это первая операция, сохраняем текущее значение
      this.previousValue = this.currentValue;
      this.resetInput = true;
    } else if (!this.resetInput) {
      // Если предыдущая операция уже была и новая цифра уже введена,
      // выполняем расчет
      this.executeOperation();
      this.previousValue = this.currentValue;
    }

    this.operation = operation;
  }

  /**
   * Очищает калькулятор
   */
  clear() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.resetInput = false;
    // Можно также очистить историю команд
    this.commandHistory = [];
  }

  /**
   * Изменяет знак числа
   */
  negate() {
    const value = parseFloat(this.currentValue);
    const command = new NegateCommand(value);

    const result = command.execute();
    this.currentValue = formatNumber(result);

    this.commandHistory.push(command);
  }

  /**
   * Вычисляет процент
   */
  percent() {
    const value = parseFloat(this.currentValue);
    const command = new PercentCommand(value);

    const result = command.execute();
    this.currentValue = formatNumber(result);

    this.commandHistory.push(command);
  }

  /**
   * Создаёт команду на основе текущей операции
   */
  createCommand() {
    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);

    switch (this.operation) {
      case 'add':
        return new AddCommand(prev, current);
      case 'subtract':
        return new SubtractCommand(prev, current);
      case 'multiply':
        return new MultiplyCommand(prev, current);
      case 'divide':
        return new DivideCommand(prev, current);
      default:
        return null;
    }
  }

  /**
   * Выполняет текущую операцию
   */
  executeOperation() {
    if (this.previousValue === null || this.operation === null) {
      return;
    }

    const command = this.createCommand();

    if (command) {
      const result = command.execute();

      if (result === 'Error') {
        this.currentValue = 'Error';
      } else {
        this.currentValue = formatNumber(result);
      }

      this.commandHistory.push(command);
      this.previousValue = null;
      this.operation = null;
      this.resetInput = true;
    }
  }

  /**
   * Отменяет последнюю операцию
   */
  undo() {
    if (this.commandHistory.length > 0) {
      const lastCommand = this.commandHistory.pop();
      const previousValue = lastCommand.undo();

      this.currentValue = formatNumber(previousValue);
      this.updateDisplay();
    }
  }

  /**
   * Обновляет отображение
   */
  updateDisplay() {
    this.display.update(this.currentValue);
  }
}
