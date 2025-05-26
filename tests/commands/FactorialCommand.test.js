import { FactorialCommand } from '../../src/commands/FactorialCommand';

describe('FactorialCommand', () => {
  test('должен вычислять факториал нуля', () => {
    const command = new FactorialCommand(0);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен вычислять факториал единицы', () => {
    const command = new FactorialCommand(1);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен вычислять факториал положительного числа', () => {
    const command = new FactorialCommand(5);
    const result = command.execute();
    expect(result).toBe(120);
  });

  test('должен вычислять факториал большого числа', () => {
    const command = new FactorialCommand(10);
    const result = command.execute();
    expect(result).toBe(3628800);
  });

  test('должен возвращать ошибку для отрицательного числа', () => {
    const command = new FactorialCommand(-1);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен возвращать ошибку для дробного числа', () => {
    const command = new FactorialCommand(3.5);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен правильно отменять операцию', () => {
    const command = new FactorialCommand(4);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(4);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new FactorialCommand(6);
    const result = command.execute();
    expect(command.result).toBe(720);
    expect(result).toBe(720);
  });

  test('должен вычислять факториал двойки', () => {
    const command = new FactorialCommand(2);
    const result = command.execute();
    expect(result).toBe(2);
  });

  test('должен вычислять факториал тройки', () => {
    const command = new FactorialCommand(3);
    const result = command.execute();
    expect(result).toBe(6);
  });
});
