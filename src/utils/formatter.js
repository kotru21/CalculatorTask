/**
 * Вспомогательная функция для форматирования числа
 * @param {number} value - число для форматирования
 * @returns {string} отформатированное число
 */
function formatNumberHelper(value) {
  // Преобразуем число в строку
  const strValue = String(value);

  // Проверяем, содержит ли число десятичную точку
  const parts = strValue.split('.');

  // Форматируем целую часть с пробелами каждые три цифры
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  // Если есть десятичная часть, соединяем их снова
  if (parts.length > 1) {
    return `${integerPart}.${parts[1]}`;
  }

  return integerPart;
}

/**
 * Форматирует число для отображения, добавляя пробелы каждые три цифры
 * @param {number|string} inputValue - число для форматирования
 * @returns {string} отформатированное число
 */
export function formatNumber(inputValue) {
  // Обработка случаев ошибок или специальных значений
  if (typeof inputValue === 'string') {
    if (
      inputValue === 'Error' ||
      inputValue === 'Infinity' ||
      inputValue === '-Infinity' ||
      inputValue === 'NaN'
    ) {
      return inputValue;
    }

    // Если это строка, но представляет число, попробуем её преобразовать
    const numValue = parseFloat(inputValue);
    if (Number.isNaN(numValue)) {
      return 'Error';
    }

    // Используем numValue вместо переназначения inputValue
    return formatNumberHelper(numValue);
  }

  // Для числовых значений
  return formatNumberHelper(inputValue);
}
