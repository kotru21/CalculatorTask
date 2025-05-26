import { formatNumber } from '../../src/utils/formatter';

describe('formatter', () => {
  describe('formatNumber', () => {
    test('должен форматировать целые числа с пробелами', () => {
      expect(formatNumber(1000)).toBe('1 000');
      expect(formatNumber(1234567)).toBe('1 234 567');
    });

    test('должен форматировать дробные числа', () => {
      expect(formatNumber(1234.56)).toBe('1 234.56');
      expect(formatNumber(1000000.123)).toBe('1 000 000.123');
    });

    test('должен обрабатывать небольшие числа без форматирования', () => {
      expect(formatNumber(123)).toBe('123');
      expect(formatNumber(12.34)).toBe('12.34');
    });

    test('должен обрабатывать специальные строковые значения', () => {
      expect(formatNumber('Error')).toBe('Error');
      expect(formatNumber('Infinity')).toBe('Infinity');
      expect(formatNumber('-Infinity')).toBe('-Infinity');
      expect(formatNumber('NaN')).toBe('NaN');
    });

    test('должен обрабатывать строки с числами', () => {
      expect(formatNumber('1234')).toBe('1 234');
      expect(formatNumber('1234.56')).toBe('1 234.56');
    });

    test('должен возвращать Error для невалидных строк', () => {
      expect(formatNumber('abc')).toBe('Error');
      expect(formatNumber('')).toBe('Error');
    });

    test('должен обрабатывать отрицательные числа', () => {
      expect(formatNumber(-1234)).toBe('-1 234');
      expect(formatNumber(-1234.56)).toBe('-1 234.56');
    });

    test('должен обрабатывать ноль', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber('0')).toBe('0');
    });
  });
});
