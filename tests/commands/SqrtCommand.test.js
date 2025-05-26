import { SqrtCommand } from '../../src/commands/SqrtCommand';

describe('SqrtCommand', () => {
  test('должен вычислять квадратный корень положительного числа', () => {
    const command = new SqrtCommand(16);
    const result = command.execute();
    expect(result).toBe(4);
  });

  test('должен вычислять квадратный корень дробного числа', () => {
    const command = new SqrtCommand(0.25);
    const result = command.execute();
    expect(result).toBe(0.5);
  });

  test('должен вычислять квадратный корень единицы', () => {
    const command = new SqrtCommand(1);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен вычислять квадратный корень нуля', () => {
    const command = new SqrtCommand(0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен возвращать ошибку для отрицательного числа', () => {
    const command = new SqrtCommand(-4);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен вычислять квадратный корень нецелого результата', () => {
    const command = new SqrtCommand(2);
    const result = command.execute();
    expect(result).toBeCloseTo(1.414213562373095, 10);
  });

  test('должен правильно отменять операцию', () => {
    const command = new SqrtCommand(25);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(25);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new SqrtCommand(9);
    const result = command.execute();
    expect(command.result).toBe(3);
    expect(result).toBe(3);
  });
});
