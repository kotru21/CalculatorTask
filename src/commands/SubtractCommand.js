import { Command } from './Command';

export class SubtractCommand extends Command {
  constructor(firstOperand, secondOperand) {
    super();
    this.firstOperand = firstOperand;
    this.secondOperand = secondOperand;
    this.result = null;
  }

  execute() {
    this.result = this.firstOperand - this.secondOperand;
    return this.result;
  }

  undo() {
    return this.firstOperand;
  }
}
