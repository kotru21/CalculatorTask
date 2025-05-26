const { PI, E } = Math;
export { PI, E };

/**
 * Возвращает абсолютное значение числа
 * @param {number} x - число
 * @returns {number} абсолютное значение
 */
export function abs(x) {
  return x < 0 ? -x : x;
}

/**
 * Округление числа вниз
 * @param {number} x - число
 * @returns {number} ближайшее целое, не превышающее x
 */
export function floor(x) {
  if (x >= 0) {
    return parseInt(x, 10);
  }
  const intPart = parseInt(abs(x), 10);
  return x === -intPart ? -intPart : -(intPart + 1);
}

/**
 * Проверка целого числа
 * @param {number} n - проверяемое число
 * @returns {boolean} true, если число целое
 */
export function isInteger(n) {
  return n === floor(n);
}

/**
 * Возведение в степень
 * @param {number} base - основание
 * @param {number} exponent - показатель степени
 * @returns {number} результат
 */
export function power(base, exponent) {
  // Обработка особых случаев
  if (exponent === 0) return 1;
  if (base === 0) return 0;

  // Целочисленная положительная степень
  if (isInteger(exponent) && exponent > 0) {
    let result = 1;
    for (let i = 0; i < exponent; i += 1) {
      result *= base;
    }
    return result;
  }

  // Целая отрицательная степень
  if (isInteger(exponent) && exponent < 0) {
    return 1 / power(base, -exponent);
  }

  // Дробная степень через экспоненту и логарифм
  // a^b = e^(b*ln(a))
  // Для хорошего приближения используем итерационный метод

  // Начальное приближение
  let result = 1;
  let prevResult = 0;

  // Для дробной степени используем бинарный поиск
  // с проверкой: если result^(1/exponent) близко к base
  let low = 0.0;
  let high = base < 1 ? 1.0 : base * 2;

  for (let i = 0; i < 50 && abs(result - prevResult) > 1e-10; i += 1) {
    prevResult = result;
    result = (low + high) / 2;

    let testPower = 1;
    const absExponent = abs(exponent);

    // Вычисляем testPower = result^absExponent
    for (let j = 0; j < 100; j += 1) {
      let currentExp = j + 1;
      if (currentExp > absExponent) {
        currentExp = absExponent;
      }
      testPower *= result;
      if (currentExp === absExponent) break;
    }

    if (exponent < 0) {
      testPower = 1 / testPower;
    }

    if (abs(testPower - base) < 1e-10) {
      break;
    }

    if (testPower < base) {
      low = result;
    } else {
      high = result;
    }
  }

  return result;
}

/**
 * Вычисление квадратного корня методом Ньютона
 * @param {number} value - число, из которого извлекаем корень
 * @returns {number|string} результат или сообщение об ошибке
 */
export function sqrt(value) {
  if (value < 0) {
    return 'Error'; // Нельзя извлечь квадратный корень из отрицательного числа
  }

  if (value === 0) return 0;

  let x = value / 2; // Начальное приближение
  let prevX = 0;

  // Метод Ньютона: x_{n+1} = 0.5 * (x_n + value/x_n)
  for (let i = 0; i < 100 && abs(x - prevX) > 1e-10; i += 1) {
    prevX = x;
    x = 0.5 * (x + value / x);
  }

  return x;
}

/**
 * Вычисление экспоненты через разложение в ряд Тейлора
 * @param {number} x - показатель степени
 * @returns {number} e^x
 */
export function exp(x) {
  // e^x = 1 + x + x^2/2! + x^3/3! + ...
  let result = 1;
  let term = 1;
  let i = 1;

  // Достаточно 20 членов ряда для хорошей точности
  while (i < 100) {
    term *= x / i;
    result += term;
    i += 1;

    // Прекращаем, если член ряда стал очень маленьким
    if (abs(term) < 1e-10) break;
  }

  return result;
}

/**
 * Вычисление натурального логарифма с использованием ряда
 * @param {number} x - аргумент
 * @returns {number|string} ln(x) или сообщение об ошибке
 */
export function ln(x) {
  if (x <= 0) {
    return 'Error'; // Логарифм не определен для неположительных чисел
  }

  if (x === 1) {
    return 0;
  }

  // Нормализуем число к диапазону [0.5, 2]
  let k = 0;
  let normalized = x;

  while (normalized > 2) {
    normalized /= 2;
    k += 1;
  }

  while (normalized < 0.5) {
    normalized *= 2;
    k -= 1;
  }

  // Применяем замену t = (normalized - 1) / (normalized + 1)
  // ln(normalized) = 2 * (t + t^3/3 + t^5/5 + ...)
  const t = (normalized - 1) / (normalized + 1);
  const t2 = t * t;

  let result = 0;
  let term = t;

  for (let i = 1; i <= 50; i += 2) {
    result += term / i;
    term *= t2;

    if (abs(term / i) < 1e-15) break;
  }

  result *= 2;

  // Восстанавливаем исходное значение: ln(x) = ln(normalized) + k*ln(2)
  const ln2 = 0.6931471805599453; // ln(2)
  result += k * ln2;

  return result;
}

/**
 * Вычисление синуса через разложение в ряд Тейлора
 * @param {number} x - угол в радианах
 * @returns {number} sin(x)
 */
export function sin(xVal) {
  // Приводим x к диапазону [-2*PI, 2*PI]
  const twoPi = 2 * PI;
  let xNormalized = xVal - twoPi * floor(xVal / twoPi);

  // Приводим x к диапазону [-PI, PI]
  if (xNormalized > PI) xNormalized -= twoPi;
  if (xNormalized < -PI) xNormalized += twoPi;

  // sin(x) = x - x^3/3! + x^5/5! - x^7/7! + ...
  let result = xNormalized;
  let term = xNormalized;
  let sign = -1;

  for (let i = 3; i <= 19; i += 2) {
    term = (term * xNormalized * xNormalized) / (i * (i - 1));
    result += sign * term;
    sign = -sign;

    if (abs(term) < 1e-12) break;
  }

  return result;
}

/**
 * Вычисление косинуса через разложение в ряд Тейлора
 * @param {number} x - угол в радианах
 * @returns {number} cos(x)
 */
export function cos(xVal) {
  // Приводим x к диапазону [-2*PI, 2*PI]
  const twoPi = 2 * PI;
  let xNormalized = xVal - twoPi * floor(xVal / twoPi);

  // Приводим x к диапазону [-PI, PI]
  if (xNormalized > PI) xNormalized -= twoPi;
  if (xNormalized < -PI) xNormalized += twoPi;

  // cos(x) = 1 - x^2/2! + x^4/4! - x^6/6! + ...
  let result = 1;
  let term = 1;
  let sign = -1;

  for (let i = 2; i <= 18; i += 2) {
    term = (term * xNormalized * xNormalized) / (i * (i - 1));
    result += sign * term;
    sign = -sign;

    if (abs(term) < 1e-12) break;
  }

  return result;
}

/**
 * Вычисление тангенса
 * @param {number} x - угол в радианах
 * @returns {number|string} tan(x) или сообщение об ошибке
 */
export function tan(x) {
  const cosValue = cos(x);

  if (abs(cosValue) < 1e-10) {
    return 'Error'; // Тангенс не определен для углов, кратных PI/2
  }

  return sin(x) / cosValue;
}

/**
 * Вычисление логарифма по основанию 10
 * @param {number} x - аргумент
 * @returns {number|string} log10(x) или сообщение об ошибке
 */
export function log10(x) {
  if (x <= 0) {
    return 'Error'; // Логарифм не определен для неположительных чисел
  }

  const ln10 = 2.302585092994046; // ln(10)
  return ln(x) / ln10;
}

/**
 * Вычисление факториала
 * @param {number} n - целое неотрицательное число
 * @returns {number|string} n! или сообщение об ошибке
 */
export function factorial(n) {
  if (n < 0 || !isInteger(n)) {
    return 'Error'; // Факториал определен только для неотрицательных целых чисел
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }

  return result;
}

/**
 * Вычисление кубического корня
 * @param {number} value - число, из которого извлекаем кубический корень
 * @returns {number|string} результат или сообщение об ошибке
 */
export function cubeRoot(value) {
  // Кубический корень, в отличие от квадратного, может извлекаться и из отрицательных чисел
  if (value === 0) return 0;

  const isNegative = value < 0;
  const absValue = isNegative ? -value : value;

  // Используем метод Ньютона для поиска кубического корня
  // x_{n+1} = (2*x_n + value/x_n^2)/3

  let x = absValue / 3; // Начальное приближение
  let prevX = 0;

  for (let i = 0; i < 100 && abs(x - prevX) > 1e-10; i += 1) {
    prevX = x;
    const x2 = x * x; // x^2
    x = (2 * x + absValue / x2) / 3;
  }

  return isNegative ? -x : x;
}

/**
 * Вычисляет натуральный логарифм числа
 * @param {number} value - число для вычисления логарифма
 * @returns {number} натуральный логарифм числа
 */
export function log(value) {
  return Math.log(value);
}
