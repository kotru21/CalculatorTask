import { InverseCommand } from '../../src/commands/InverseCommand';

describe('InverseCommand', () => {
  test('должен вычислять обратное положительного числа', () => {
    const command = new InverseCommand(4);
    const result = command.execute();
    expect(result).toBe(0.25);
  });

  test('должен вычислять обратное отрицательного числа', () => {
    const command = new InverseCommand(-2);
    const result = command.execute();
    expect(result).toBe(-0.5);
  });

  test('должен вычислять обратное дробного числа', () => {
    const command = new InverseCommand(0.5);
    const result = command.execute();
    expect(result).toBe(2);
  });

  test('должен возвращать ошибку для нуля', () => {
    const command = new InverseCommand(0);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен вычислять обратное единицы', () => {
    const command = new InverseCommand(1);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен правильно отменять операцию', () => {
    const command = new InverseCommand(8);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(8);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new InverseCommand(5);
    const result = command.execute();
    expect(command.result).toBe(0.2);
    expect(result).toBe(0.2);
  });

  test('должен работать с очень маленькими числами', () => {
    const command = new InverseCommand(1e-5);
    const result = command.execute();
    expect(result).toBeCloseTo(1e5, 5);
  });
});
