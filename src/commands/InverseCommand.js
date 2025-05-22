import { Command } from './Command';

export class InverseCommand extends Command {
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  execute() {
    if (this.value === 0) {
      return 'Error';
    }
    this.result = 1 / this.value;
    return this.result;
  }

  undo() {
    return this.originalValue;
  }
}
