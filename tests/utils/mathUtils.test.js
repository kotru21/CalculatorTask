import {
  abs,
  floor,
  isInteger,
  power,
  sqrt,
  sin,
  cos,
  tan,
  ln,
  log10,
  factorial,
  cubeRoot,
  PI,
  E,
} from '../../src/utils/mathUtils';

describe('mathUtils', () => {
  describe('abs', () => {
    test('должен возвращать абсолютное значение положительного числа', () => {
      expect(abs(5)).toBe(5);
    });

    test('должен возвращать абсолютное значение отрицательного числа', () => {
      expect(abs(-5)).toBe(5);
    });

    test('должен возвращать 0 для нуля', () => {
      expect(abs(0)).toBe(0);
    });
  });

  describe('floor', () => {
    test('должен округлять положительное число вниз', () => {
      expect(floor(3.7)).toBe(3);
    });

    test('должен округлять отрицательное число вниз', () => {
      expect(floor(-3.7)).toBe(-4);
    });

    test('должен возвращать целое число без изменений', () => {
      expect(floor(5)).toBe(5);
    });
  });

  describe('isInteger', () => {
    test('должен определять целые числа', () => {
      expect(isInteger(5)).toBe(true);
      expect(isInteger(-3)).toBe(true);
      expect(isInteger(0)).toBe(true);
    });

    test('должен определять дробные числа', () => {
      expect(isInteger(3.14)).toBe(false);
      expect(isInteger(-2.5)).toBe(false);
    });
  });

  describe('power', () => {
    test('должен возводить в положительную степень', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 2)).toBe(25);
    });

    test('должен возводить в нулевую степень', () => {
      expect(power(5, 0)).toBe(1);
      expect(power(-3, 0)).toBe(1);
    });

    test('должен возводить в отрицательную степень', () => {
      expect(power(2, -1)).toBe(0.5);
      expect(power(4, -2)).toBe(0.0625);
    });

    test('должен обрабатывать ноль', () => {
      expect(power(0, 5)).toBe(0);
    });
  });

  describe('sqrt', () => {
    test('должен вычислять квадратный корень', () => {
      expect(sqrt(16)).toBe(4);
      expect(sqrt(25)).toBe(5);
      expect(sqrt(0)).toBe(0);
    });

    test('должен возвращать ошибку для отрицательных чисел', () => {
      expect(sqrt(-4)).toBe('Error');
    });
  });

  describe('trigonometric functions', () => {
    test('sin должен работать корректно', () => {
      expect(sin(0)).toBeCloseTo(0);
      expect(sin(PI / 2)).toBeCloseTo(1);
      expect(sin(PI)).toBeCloseTo(0, 10);
    });

    test('cos должен работать корректно', () => {
      expect(cos(0)).toBeCloseTo(1);
      expect(cos(PI / 2)).toBeCloseTo(0, 10);
      expect(cos(PI)).toBeCloseTo(-1);
    });

    test('tan должен работать корректно', () => {
      expect(tan(0)).toBeCloseTo(0);
      expect(tan(PI / 4)).toBeCloseTo(1);
      expect(tan(PI / 2)).toBe('Error');
    });
  });

  describe('logarithms', () => {
    test('ln должен работать корректно', () => {
      expect(ln(1)).toBe(0);
      expect(ln(E)).toBeCloseTo(1, 5);
      expect(ln(0)).toBe('Error');
      expect(ln(-1)).toBe('Error');
    });

    test('log10 должен работать корректно', () => {
      expect(log10(1)).toBe(0);
      expect(log10(10)).toBeCloseTo(1, 10);
      expect(log10(100)).toBeCloseTo(2, 10);
      expect(log10(0)).toBe('Error');
    });
  });

  describe('factorial', () => {
    test('должен вычислять факториал', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
    });

    test('должен возвращать ошибку для отрицательных чисел', () => {
      expect(factorial(-1)).toBe('Error');
    });

    test('должен возвращать ошибку для дробных чисел', () => {
      expect(factorial(3.5)).toBe('Error');
    });
  });

  describe('cubeRoot', () => {
    test('должен вычислять кубический корень', () => {
      expect(cubeRoot(8)).toBeCloseTo(2);
      expect(cubeRoot(-8)).toBeCloseTo(-2);
      expect(cubeRoot(0)).toBe(0);
    });
  });
});
