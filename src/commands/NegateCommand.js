import { Command } from './Command';

export class NegateCommand extends Command {
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  execute() {
    this.result = -this.value;
    return this.result;
  }

  undo() {
    return this.originalValue;
  }
}
