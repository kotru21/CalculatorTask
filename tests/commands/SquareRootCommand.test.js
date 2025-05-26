import { SquareRootCommand } from '../../src/commands/SquareRootCommand';

describe('SquareRootCommand', () => {
  test('должен извлекать квадратный корень из положительного числа', () => {
    const command = new SquareRootCommand(16);
    const result = command.execute();
    expect(result).toBe(4);
  });

  test('должен извлекать квадратный корень из дробного числа', () => {
    const command = new SquareRootCommand(0.25);
    const result = command.execute();
    expect(result).toBe(0.5);
  });

  test('должен извлекать квадратный корень из единицы', () => {
    const command = new SquareRootCommand(1);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен извлекать квадратный корень из нуля', () => {
    const command = new SquareRootCommand(0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен возвращать ошибку для отрицательного числа', () => {
    const command = new SquareRootCommand(-4);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен извлекать квадратный корень нецелого результата', () => {
    const command = new SquareRootCommand(2);
    const result = command.execute();
    expect(result).toBeCloseTo(1.414213562373095, 10);
  });

  test('должен правильно отменять операцию', () => {
    const command = new SquareRootCommand(25);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(25);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new SquareRootCommand(9);
    const result = command.execute();
    expect(command.result).toBe(3);
    expect(result).toBe(3);
  });

  test('должен работать с большими числами', () => {
    const command = new SquareRootCommand(10000);
    const result = command.execute();
    expect(result).toBe(100);
  });

  test('должен работать с очень маленькими положительными числами', () => {
    const command = new SquareRootCommand(0.0001);
    const result = command.execute();
    expect(result).toBe(0.01);
  });
});
