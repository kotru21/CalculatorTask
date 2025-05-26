import { CosCommand } from '../../src/commands/CosCommand';

describe('CosCommand', () => {
  test('должен вычислять косинус 0 градусов', () => {
    const command = new CosCommand(0);
    const result = command.execute();
    expect(result).toBeCloseTo(1);
  });

  test('должен вычислять косинус 90 градусов', () => {
    const command = new CosCommand(90);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять косинус 180 градусов', () => {
    const command = new CosCommand(180);
    const result = command.execute();
    expect(result).toBeCloseTo(-1);
  });

  test('должен вычислять косинус 270 градусов', () => {
    const command = new CosCommand(270);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять косинус 360 градусов', () => {
    const command = new CosCommand(360);
    const result = command.execute();
    expect(result).toBeCloseTo(1);
  });

  test('должен вычислять косинус 60 градусов', () => {
    const command = new CosCommand(60);
    const result = command.execute();
    expect(result).toBeCloseTo(0.5);
  });

  test('должен вычислять косинус отрицательного угла', () => {
    const command = new CosCommand(-60);
    const result = command.execute();
    expect(result).toBeCloseTo(0.5);
  });

  test('должен правильно отменять операцию', () => {
    const command = new CosCommand(45);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(45);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new CosCommand(30);
    const result = command.execute();
    expect(command.result).toBeCloseTo(Math.sqrt(3) / 2);
    expect(result).toBeCloseTo(Math.sqrt(3) / 2);
  });

  test('должен работать с дробными углами', () => {
    const command = new CosCommand(45.5);
    const result = command.execute();
    expect(result).toBeCloseTo(Math.cos((45.5 * Math.PI) / 180));
  });

  test('должен работать с большими углами', () => {
    const command = new CosCommand(720); // два полных оборота
    const result = command.execute();
    expect(result).toBeCloseTo(1);
  });
});
