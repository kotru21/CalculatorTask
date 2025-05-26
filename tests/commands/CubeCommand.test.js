import { CubeCommand } from '../../src/commands/CubeCommand';

describe('CubeCommand', () => {
  test('должен возводить положительное число в куб', () => {
    const command = new CubeCommand(3);
    const result = command.execute();
    expect(result).toBe(27);
  });

  test('должен возводить отрицательное число в куб', () => {
    const command = new CubeCommand(-2);
    const result = command.execute();
    expect(result).toBe(-8);
  });

  test('должен возводить ноль в куб', () => {
    const command = new CubeCommand(0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен возводить дробное число в куб', () => {
    const command = new CubeCommand(0.5);
    const result = command.execute();
    expect(result).toBeCloseTo(0.125);
  });

  test('должен правильно отменять операцию', () => {
    const command = new CubeCommand(4);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(4);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new CubeCommand(5);
    const result = command.execute();
    expect(command.result).toBe(125);
    expect(result).toBe(125);
  });

  test('должен работать с единицей', () => {
    const command = new CubeCommand(1);
    const result = command.execute();
    expect(result).toBe(1);
  });
});
