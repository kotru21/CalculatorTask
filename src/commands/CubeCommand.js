import { Command } from './Command';
import { power } from '../utils/mathUtils';

export class CubeCommand extends Command {
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  execute() {
    this.result = power(this.value, 3);
    return this.result;
  }

  undo() {
    return this.originalValue;
  }
}
