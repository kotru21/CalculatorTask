import { NegateCommand } from '../../src/commands/NegateCommand';

describe('NegateCommand', () => {
  test('должен делать положительное число отрицательным', () => {
    const command = new NegateCommand(5);
    const result = command.execute();
    expect(result).toBe(-5);
  });

  test('должен делать отрицательное число положительным', () => {
    const command = new NegateCommand(-10);
    const result = command.execute();
    expect(result).toBe(10);
  });

  test('должен обрабатывать ноль', () => {
    const command = new NegateCommand(0);
    const result = command.execute();
    expect(result).toBe(-0);
  });

  test('должен обрабатывать дробные числа', () => {
    const command = new NegateCommand(3.14);
    const result = command.execute();
    expect(result).toBe(-3.14);
  });

  test('должен правильно отменять операцию', () => {
    const command = new NegateCommand(42);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(42);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new NegateCommand(7);
    const result = command.execute();
    expect(command.result).toBe(-7);
    expect(result).toBe(-7);
  });

  test('должен работать с очень большими числами', () => {
    const command = new NegateCommand(1e10);
    const result = command.execute();
    expect(result).toBe(-1e10);
  });
});
