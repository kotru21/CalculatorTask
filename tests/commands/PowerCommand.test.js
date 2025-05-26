import { PowerCommand } from '../../src/commands/PowerCommand';

describe('PowerCommand', () => {
  test('должен возводить положительное число в положительную степень', () => {
    const command = new PowerCommand(2, 3);
    const result = command.execute();
    expect(result).toBe(8);
  });

  test('должен возводить число в нулевую степень', () => {
    const command = new PowerCommand(5, 0);
    const result = command.execute();
    expect(result).toBe(1);
  });

  test('должен возводить число в первую степень', () => {
    const command = new PowerCommand(7, 1);
    const result = command.execute();
    expect(result).toBe(7);
  });

  test('должен возводить число в отрицательную степень', () => {
    const command = new PowerCommand(2, -2);
    const result = command.execute();
    expect(result).toBe(0.25);
  });

  test('должен возводить отрицательное число в четную степень', () => {
    const command = new PowerCommand(-3, 2);
    const result = command.execute();
    expect(result).toBe(9);
  });

  test('должен возводить отрицательное число в нечетную степень', () => {
    const command = new PowerCommand(-2, 3);
    const result = command.execute();
    expect(result).toBe(-8);
  });

  test('должен возводить дробное число в степень', () => {
    const command = new PowerCommand(0.5, 3);
    const result = command.execute();
    expect(result).toBe(0.125);
  });

  test('должен возвращать ошибку для 0 в отрицательной степени', () => {
    const command = new PowerCommand(0, -1);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен правильно отменять операцию', () => {
    const command = new PowerCommand(3, 2);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toEqual([3, 2]);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new PowerCommand(4, 2);
    const result = command.execute();
    expect(command.result).toBe(16);
    expect(result).toBe(16);
  });
});
