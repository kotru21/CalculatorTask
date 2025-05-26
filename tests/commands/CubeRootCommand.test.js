import { CubeRootCommand } from '../../src/commands/CubeRootCommand';

describe('CubeRootCommand', () => {
  test('должен извлекать кубический корень из положительного числа', () => {
    const command = new CubeRootCommand(8);
    const result = command.execute();
    expect(result).toBe(2);
  });

  test('должен извлекать кубический корень из отрицательного числа', () => {
    const command = new CubeRootCommand(-8);
    const result = command.execute();
    expect(result).toBe(-2);
  });

  test('должен извлекать кубический корень из нуля', () => {
    const command = new CubeRootCommand(0);
    const result = command.execute();
    expect(result).toBe(0);
  });

  test('должен извлекать кубический корень из дробного числа', () => {
    const command = new CubeRootCommand(0.125);
    const result = command.execute();
    expect(result).toBeCloseTo(0.5);
  });

  test('должен правильно отменять операцию', () => {
    const command = new CubeRootCommand(27);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(27);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new CubeRootCommand(64);
    const result = command.execute();
    expect(command.result).toBe(4);
    expect(result).toBe(4);
  });

  test('должен работать с большими числами', () => {
    const command = new CubeRootCommand(1000);
    const result = command.execute();
    expect(result).toBe(10);
  });
});
