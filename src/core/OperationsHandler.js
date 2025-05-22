import { EventHandler } from './EventHandler';
import { formatNumber } from '../utils/formatter';

// Импорт всех команд
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

/**
 * Класс для обработки математических операций
 */
export class OperationsHandler extends EventHandler {
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
}
