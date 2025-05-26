import { Command } from '../../src/commands/Command';

describe('Command', () => {
  test('должен выбрасывать ошибку при вызове execute() базового класса', () => {
    const command = new Command();
    expect(() => command.execute()).toThrow('Метод execute() должен быть реализован в подклассе');
  });

  test('должен выбрасывать ошибку при вызове undo() базового класса', () => {
    const command = new Command();
    expect(() => command.undo()).toThrow('Метод undo() должен быть реализован в подклассе');
  });

  test('должен создавать экземпляр Command', () => {
    const command = new Command();
    expect(command).toBeInstanceOf(Command);
  });
});
