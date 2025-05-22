import { Command } from './Command';
import { sqrt } from '../utils/mathUtils';

export class SquareRootCommand extends Command {
  constructor(value) {
    super();
    this.value = value;
    this.originalValue = value;
  }

  execute() {
    // Используем нашу собственную функцию sqrt вместо Math.sqrt
    const result = sqrt(this.value);
    this.result = result;
    return this.result;
  }

  undo() {
    return this.originalValue;
  }
}
