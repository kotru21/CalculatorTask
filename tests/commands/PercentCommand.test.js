import { PercentCommand } from '../../src/commands/PercentCommand';

describe('PercentCommand', () => {
  test('должен вычислять процент от положительного числа', () => {
    const command = new PercentCommand(50);
    const result = command.execute();
    expect(result).toBe(0.5);
  });

  test('должен вычислять процент от нуля', () => {
    const command = new PercentCommand(0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен вычислять процент от отрицательного числа', () => {
    const command = new PercentCommand(-25);
    const result = command.execute();
    expect(result).toBe(-0.25);
  });

  test('должен вычислять процент от дробного числа', () => {
    const command = new PercentCommand(12.5);
    const result = command.execute();
    expect(result).toBe(0.125);
  });

  test('должен вычислять процент от 100', () => {
    const command = new PercentCommand(100);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен вычислять процент от 1', () => {
    const command = new PercentCommand(1);
    const result = command.execute();
    expect(result).toBe(0.01);
  });

  test('должен правильно отменять операцию', () => {
    const command = new PercentCommand(75);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(75);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new PercentCommand(20);
    const result = command.execute();
    expect(command.result).toBe(0.2);
    expect(result).toBe(0.2);
  });

  test('должен работать с очень большими числами', () => {
    const command = new PercentCommand(1000);
    const result = command.execute();
    expect(result).toBe(10);
  });

  test('должен работать с очень маленькими числами', () => {
    const command = new PercentCommand(0.01);
    const result = command.execute();
    expect(result).toBe(0.0001);
  });
});
