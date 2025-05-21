import { Command } from './Command';

export class AddCommand extends Command {
  /**
   * @param {number} firstOperand - первый операнд (предыдущее значение)
   * @param {number} secondOperand - второй операнд (текущее значение)
   */
  constructor(firstOperand, secondOperand) {
    super();
    this.firstOperand = firstOperand;
    this.secondOperand = secondOperand;
    this.result = null;
  }

  execute() {
    this.result = this.firstOperand + this.secondOperand;
    return this.result;
  }

  undo() {
    return this.firstOperand;
  }
}
