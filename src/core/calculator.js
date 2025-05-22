import { AddCommand } from '../commands/AddCommand';
import { SubtractCommand } from '../commands/SubtractCommand';
import { MultiplyCommand } from '../commands/MultiplyCommand';
import { DivideCommand } from '../commands/DivideCommand';
import { PercentCommand } from '../commands/PercentCommand';
import { NegateCommand } from '../commands/NegateCommand';
import { SquareCommand } from '../commands/SquareCommand';
import { SquareRootCommand } from '../commands/SquareRootCommand';
import { CubeCommand } from '../commands/CubeCommand';
import { CubeRootCommand } from '../commands/CubeRootCommand';
import { SinCommand } from '../commands/SinCommand';
import { CosCommand } from '../commands/CosCommand';
import { TanCommand } from '../commands/TanCommand';
import { LogCommand } from '../commands/LogCommand';
import { FactorialCommand } from '../commands/FactorialCommand';
import { InverseCommand } from '../commands/InverseCommand';
import { PowerCommand } from '../commands/PowerCommand';
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
    this.memoryValue = 0; // Значение в памяти
    this.hasMemory = false; // Флаг наличия значения в памяти
    this.operationHistory = []; // История операций для отображения
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
      // console.log('Нажата клавиша:', event.key); // Отладка

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

    // Обработчики для кнопок памяти
    document.querySelectorAll('.btn.memory').forEach((button) => {
      button.addEventListener('click', () => {
        this.handleMemoryOperation(button.getAttribute('data-action'));
      });
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
      // Научные операции с одним аргументом
      case 'square':
        this.executeUnaryOperation(new SquareCommand(parseFloat(this.currentValue)));
        break;
      case 'sqrt':
        this.executeUnaryOperation(new SquareRootCommand(parseFloat(this.currentValue)));
        break;
      case 'cube':
        this.executeUnaryOperation(new CubeCommand(parseFloat(this.currentValue)));
        break;
      case 'cuberoot':
        this.executeUnaryOperation(new CubeRootCommand(parseFloat(this.currentValue)));
        break;
      case 'sin':
        this.executeUnaryOperation(new SinCommand(parseFloat(this.currentValue)));
        break;
      case 'cos':
        this.executeUnaryOperation(new CosCommand(parseFloat(this.currentValue)));
        break;
      case 'tan':
        this.executeUnaryOperation(new TanCommand(parseFloat(this.currentValue)));
        break;
      case 'log':
        this.executeUnaryOperation(new LogCommand(parseFloat(this.currentValue)));
        break;
      case 'factorial':
        this.executeUnaryOperation(new FactorialCommand(parseFloat(this.currentValue)));
        break;
      case 'inverse':
        this.executeUnaryOperation(new InverseCommand(parseFloat(this.currentValue)));
        break;
      // Операции с двумя аргументами
      case 'power':
        this.setOperation(operation);
        break;
      case 'backspace':
        this.backspace();
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

    // Отображаем выражение
    const symbol = this.getOperationSymbol(operation);
    const expression = `${this.previousValue} ${symbol}`;
    this.display.updateExpression(expression);
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
      case 'power':
        return new PowerCommand(prev, current);
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
      const prevValue = this.previousValue;
      const symbol = this.getOperationSymbol(this.operation);
      const currentVal = this.currentValue;

      if (result === 'Error') {
        this.currentValue = 'Error';
      } else {
        this.currentValue = formatNumber(result);
      }

      this.commandHistory.push(command);
      this.previousValue = null;
      this.operation = null;
      this.resetInput = true;

      // Очищаем выражение после завершения операции
      this.display.updateExpression('');

      // Добавляем операцию в историю
      const expression = `${prevValue} ${symbol} ${currentVal}`;
      this.display.addToHistory(expression, this.currentValue);
    }
  }

  /**
   * Выполняет унарную операцию (над одним числом)
   * @param {Command} command - объект команды для выполнения
   */
  executeUnaryOperation(command) {
    const inputValue = this.currentValue;
    const result = command.execute();

    if (result === 'Error') {
      this.currentValue = 'Error';
    } else {
      this.currentValue = formatNumber(result);
    }

    this.commandHistory.push(command);
    this.resetInput = true;

    // Определяем символ операции для истории
    const operationName = command.constructor.name.replace('Command', '');
    let expression = '';

    switch (operationName) {
      case 'Square':
        expression = `sqr(${inputValue})`;
        break;
      case 'SquareRoot':
        expression = `√(${inputValue})`;
        break;
      case 'Cube':
        expression = `(${inputValue})³`;
        break;
      case 'CubeRoot':
        expression = `∛(${inputValue})`;
        break;
      case 'Sin':
        expression = `sin(${inputValue})`;
        break;
      case 'Cos':
        expression = `cos(${inputValue})`;
        break;
      case 'Tan':
        expression = `tan(${inputValue})`;
        break;
      case 'Log':
        expression = `log(${inputValue})`;
        break;
      case 'Factorial':
        expression = `${inputValue}!`;
        break;
      case 'Inverse':
        expression = `1/(${inputValue})`;
        break;
      default:
        expression = `${operationName}(${inputValue})`;
    }

    // Добавляем в историю
    this.display.addToHistory(expression, this.currentValue);
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
   * Устанавливает текущее значение
   * @param {string} value - новое значение
   */
  setCurrentValue(value) {
    this.currentValue = value;
    this.resetInput = true;
    this.updateDisplay();
  }

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

  /**
   * Обновляет отображение
   */
  updateDisplay() {
    this.display.update(this.currentValue);
  }

  /**
   * Возвращает символ операции для отображения
   */
  getOperationSymbol(operation) {
    const symbols = {
      add: '+',
      subtract: '-',
      multiply: '×',
      divide: '÷',
      power: '^',
      square: '²',
      sqrt: '√',
      cube: '³',
      sin: 'sin',
      cos: 'cos',
      tan: 'tan',
      log: 'log',
      factorial: '!',
    };

    return symbols[operation] || '';
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
