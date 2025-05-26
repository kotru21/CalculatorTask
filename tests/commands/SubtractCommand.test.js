import { SubtractCommand } from '../../src/commands/SubtractCommand';

describe('SubtractCommand', () => {
  test('должен вычитать два положительных числа', () => {
    const command = new SubtractCommand(10, 3);
    const result = command.execute();
    expect(result).toBe(7);
  });

  test('должен вычитать отрицательное число из положительного', () => {
    const command = new SubtractCommand(10, -3);
    const result = command.execute();
    expect(result).toBe(13);
  });

  test('должен вычитать положительное число из отрицательного', () => {
    const command = new SubtractCommand(-5, 3);
    const result = command.execute();
    expect(result).toBe(-8);
  });

  test('должен вычитать два отрицательных числа', () => {
    const command = new SubtractCommand(-5, -3);
    const result = command.execute();
    expect(result).toBe(-2);
  });

  test('должен вычитать ноль', () => {
    const command = new SubtractCommand(7, 0);
    const result = command.execute();
    expect(result).toBe(7);
  });

  test('должен вычитать из нуля', () => {
    const command = new SubtractCommand(0, 5);
    const result = command.execute();
    expect(result).toBe(-5);
  });

  test('должен вычитать дробные числа', () => {
    const command = new SubtractCommand(5.7, 2.3);
    const result = command.execute();
    expect(result).toBeCloseTo(3.4);
  });

  test('должен правильно отменять операцию', () => {
    const command = new SubtractCommand(10, 3);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(10);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new SubtractCommand(8, 3);
    const result = command.execute();
    expect(command.result).toBe(5);
    expect(result).toBe(5);
  });

  test('должен работать с очень большими числами', () => {
    const command = new SubtractCommand(3e10, 1e10);
    const result = command.execute();
    expect(result).toBe(2e10);
  });

  test('должен возвращать ноль при вычитании одинаковых чисел', () => {
    const command = new SubtractCommand(42, 42);
    const result = command.execute();
    expect(result).toBe(0);
  });
});
