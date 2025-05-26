import { SinCommand } from '../../src/commands/SinCommand';

describe('SinCommand', () => {
  test('должен вычислять синус 0 градусов', () => {
    const command = new SinCommand(0);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять синус 30 градусов', () => {
    const command = new SinCommand(30);
    const result = command.execute();
    expect(result).toBeCloseTo(0.5);
  });

  test('должен вычислять синус 90 градусов', () => {
    const command = new SinCommand(90);
    const result = command.execute();
    expect(result).toBeCloseTo(1);
  });

  test('должен вычислять синус 180 градусов', () => {
    const command = new SinCommand(180);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять синус 270 градусов', () => {
    const command = new SinCommand(270);
    const result = command.execute();
    expect(result).toBeCloseTo(-1);
  });

  test('должен вычислять синус 360 градусов', () => {
    const command = new SinCommand(360);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять синус отрицательного угла', () => {
    const command = new SinCommand(-30);
    const result = command.execute();
    expect(result).toBeCloseTo(-0.5);
  });

  test('должен правильно отменять операцию', () => {
    const command = new SinCommand(45);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(45);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new SinCommand(60);
    const result = command.execute();
    expect(command.result).toBeCloseTo(Math.sqrt(3) / 2);
    expect(result).toBeCloseTo(Math.sqrt(3) / 2);
  });

  test('должен работать с дробными углами', () => {
    const command = new SinCommand(45.5);
    const result = command.execute();
    expect(result).toBeCloseTo(Math.sin((45.5 * Math.PI) / 180));
  });

  test('должен работать с большими углами', () => {
    const command = new SinCommand(720); // два полных оборота
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });
});
