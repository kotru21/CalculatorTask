import { DivideCommand } from '../../src/commands/DivideCommand';

describe('DivideCommand', () => {
  test('должен делить два положительных числа', () => {
    const command = new DivideCommand(15, 3);
    const result = command.execute();
    expect(result).toBe(5);
  });

  test('должен делить положительное число на отрицательное', () => {
    const command = new DivideCommand(10, -2);
    const result = command.execute();
    expect(result).toBe(-5);
  });

  test('должен делить отрицательное число на положительное', () => {
    const command = new DivideCommand(-12, 3);
    const result = command.execute();
    expect(result).toBe(-4);
  });

  test('должен делить два отрицательных числа', () => {
    const command = new DivideCommand(-20, -4);
    const result = command.execute();
    expect(result).toBe(5);
  });

  test('должен возвращать Error при делении на ноль', () => {
    const command = new DivideCommand(10, 0);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен делить ноль на число', () => {
    const command = new DivideCommand(0, 5);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен делить дробные числа', () => {
    const command = new DivideCommand(7.5, 2.5);
    const result = command.execute();
    expect(result).toBeCloseTo(3);
  });

  test('должен правильно отменять операцию', () => {
    const command = new DivideCommand(20, 4);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(20);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new DivideCommand(24, 6);
    const result = command.execute();
    expect(command.result).toBe(4);
    expect(result).toBe(4);
  });

  test('должен работать с очень большими числами', () => {
    const command = new DivideCommand(2e10, 2e5);
    const result = command.execute();
    expect(result).toBe(1e5);
  });

  test('должен возвращать 1 при делении числа на само себя', () => {
    const command = new DivideCommand(42, 42);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен возвращать исходное число при делении на 1', () => {
    const command = new DivideCommand(42, 1);
    const result = command.execute();
    expect(result).toBe(42);
  });
});
