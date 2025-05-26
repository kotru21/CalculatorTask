import { SquareCommand } from '../../src/commands/SquareCommand';

describe('SquareCommand', () => {
  test('должен возводить положительное число в квадрат', () => {
    const command = new SquareCommand(5);
    const result = command.execute();
    expect(result).toBe(25);
  });

  test('должен возводить отрицательное число в квадрат', () => {
    const command = new SquareCommand(-4);
    const result = command.execute();
    expect(result).toBe(16);
  });

  test('должен возводить ноль в квадрат', () => {
    const command = new SquareCommand(0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен возводить дробное число в квадрат', () => {
    const command = new SquareCommand(2.5);
    const result = command.execute();
    expect(result).toBe(6.25);
  });

  test('должен возводить единицу в квадрат', () => {
    const command = new SquareCommand(1);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен правильно отменять операцию', () => {
    const command = new SquareCommand(7);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(7);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new SquareCommand(3);
    const result = command.execute();
    expect(command.result).toBe(9);
    expect(result).toBe(9);
  });

  test('должен работать с очень маленькими числами', () => {
    const command = new SquareCommand(0.1);
    const result = command.execute();
    expect(result).toBeCloseTo(0.01);
  });

  test('должен работать с большими числами', () => {
    const command = new SquareCommand(100);
    const result = command.execute();
    expect(result).toBe(10000);
  });
});
