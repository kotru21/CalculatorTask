import { LogCommand } from '../../src/commands/LogCommand';

describe('LogCommand', () => {
  test('должен вычислять логарифм положительного числа', () => {
    const command = new LogCommand(100);
    const result = command.execute();
    expect(result).toBeCloseTo(2, 10);
  });

  test('должен вычислять логарифм единицы', () => {
    const command = new LogCommand(1);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен вычислять логарифм числа больше единицы', () => {
    const command = new LogCommand(1000);
    const result = command.execute();
    expect(result).toBeCloseTo(3, 10);
  });

  test('должен вычислять логарифм дробного числа', () => {
    const command = new LogCommand(0.1);
    const result = command.execute();
    expect(result).toBeCloseTo(-1, 10);
  });

  test('должен возвращать ошибку для нуля', () => {
    const command = new LogCommand(0);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен возвращать ошибку для отрицательного числа', () => {
    const command = new LogCommand(-5);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен правильно отменять операцию', () => {
    const command = new LogCommand(100);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(100);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new LogCommand(10);
    const result = command.execute();
    expect(command.result).toBeCloseTo(1, 10);
    expect(result).toBeCloseTo(1, 10);
  });
});
