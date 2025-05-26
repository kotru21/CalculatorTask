import { TanCommand } from '../../src/commands/TanCommand';

describe('TanCommand', () => {
  test('должен вычислять тангенс 0 градусов', () => {
    const command = new TanCommand(0);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять тангенс 45 градусов', () => {
    const command = new TanCommand(45);
    const result = command.execute();
    expect(result).toBeCloseTo(1);
  });

  test('должен вычислять тангенс 30 градусов', () => {
    const command = new TanCommand(30);
    const result = command.execute();
    expect(result).toBeCloseTo(Math.sqrt(3) / 3);
  });

  test('должен вычислять тангенс 60 градусов', () => {
    const command = new TanCommand(60);
    const result = command.execute();
    expect(result).toBeCloseTo(Math.sqrt(3));
  });

  test('должен возвращать ошибку для 90 градусов', () => {
    const command = new TanCommand(90);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен возвращать ошибку для 270 градусов', () => {
    const command = new TanCommand(270);
    const result = command.execute();
    expect(result).toBe('Error');
  });

  test('должен вычислять тангенс 180 градусов', () => {
    const command = new TanCommand(180);
    const result = command.execute();
    expect(result).toBeCloseTo(0);
  });

  test('должен вычислять тангенс отрицательного угла', () => {
    const command = new TanCommand(-45);
    const result = command.execute();
    expect(result).toBeCloseTo(-1);
  });

  test('должен правильно отменять операцию', () => {
    const command = new TanCommand(30);
    command.execute();
    const undoResult = command.undo();
    expect(undoResult).toBe(30);
  });

  test('должен сохранять результат после выполнения', () => {
    const command = new TanCommand(45);
    const result = command.execute();
    expect(command.result).toBeCloseTo(1);
    expect(result).toBeCloseTo(1);
  });

  test('должен работать с дробными углами', () => {
    const command = new TanCommand(22.5);
    const result = command.execute();
    expect(result).toBeCloseTo(Math.tan((22.5 * Math.PI) / 180));
  });

  test('должен работать с большими углами', () => {
    const command = new TanCommand(405); // 360 + 45 градусов
    const result = command.execute();
    expect(result).toBeCloseTo(1);
  });
});
