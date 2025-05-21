import { Command } from './Command';

export class PercentCommand extends Command {
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  execute() {
    this.result = this.value / 100;
    return this.result;
  }

  undo() {
    return this.originalValue;
  }
}
