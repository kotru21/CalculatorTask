import { MultiplyCommand } from '../../src/commands/MultiplyCommand';

describe('MultiplyCommand', () => {
  test('должен умножать два положительных числа', () => {
    const command = new MultiplyCommand(5, 3);
    const result = command.execute();
    expect(result).toBe(15);
  });

  test('должен умножать положительное и отрицательное число', () => {
    const command = new MultiplyCommand(10, -3);
    const result = command.execute();
    expect(result).toBe(-30);
  });

  test('должен умножать два отрицательных числа', () => {
    const command = new MultiplyCommand(-5, -3);
    const result = command.execute();
    expect(result).toBe(15);
  });

  test('должен умножать на ноль', () => {
    const command = new MultiplyCommand(7, 0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен умножать дробные числа', () => {
    const command = new MultiplyCommand(2.5, 1.4);
    const result = command.execute();
    expect(result).toBeCloseTo(3.5);
  });

  test('должен правильно отменять операцию', () => {
    const command = new MultiplyCommand(10, 5);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(10);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new MultiplyCommand(3, 4);
    const result = command.execute();
    expect(command.result).toBe(12);
    expect(result).toBe(12);
  });

  test('должен работать с очень большими числами', () => {
    const command = new MultiplyCommand(1e5, 2e5);
    const result = command.execute();
    expect(result).toBe(2e10);
  });

  test('должен умножать на единицу', () => {
    const command = new MultiplyCommand(42, 1);
    const result = command.execute();
    expect(result).toBe(42);
  });
});
