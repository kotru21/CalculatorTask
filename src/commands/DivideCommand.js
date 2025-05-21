import { Command } from './Command';

export class DivideCommand extends Command {
  constructor(firstOperand, secondOperand) {
    super();
    this.firstOperand = firstOperand;
    this.secondOperand = secondOperand;
    this.result = null;
  }

  execute() {
    if (this.secondOperand === 0) {
      return 'Error';
    }
    this.result = this.firstOperand / this.secondOperand;
    return this.result;
  }

  undo() {
    return this.firstOperand;
  }
}
