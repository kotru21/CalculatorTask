import { AddCommand } from '../../src/commands/AddCommand';

describe('AddCommand', () => {
  test('должен складывать два положительных числа', () => {
    const command = new AddCommand(5, 3);
    const result = command.execute();
    expect(result).toBe(8);
  });

  test('должен складывать положительное и отрицательное число', () => {
    const command = new AddCommand(10, -3);
    const result = command.execute();
    expect(result).toBe(7);
  });

  test('должен складывать два отрицательных числа', () => {
    const command = new AddCommand(-5, -3);
    const result = command.execute();
    expect(result).toBe(-8);
  });

  test('должен складывать с нулем', () => {
    const command = new AddCommand(7, 0);
    const result = command.execute();
    expect(result).toBe(7);
  });

  test('должен складывать дробные числа', () => {
    const command = new AddCommand(2.5, 1.7);
    const result = command.execute();
    expect(result).toBeCloseTo(4.2);
  });

  test('должен правильно отменять операцию', () => {
    const command = new AddCommand(10, 5);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(10);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new AddCommand(3, 4);
    const result = command.execute();
    expect(command.result).toBe(7);
    expect(result).toBe(7);
  });

  test('должен работать с очень большими числами', () => {
    const command = new AddCommand(1e10, 2e10);
    const result = command.execute();
    expect(result).toBe(3e10);
  });
});
