/**
 * Форматирует число для отображения
 * @param {number|string} value - число для форматирования
 * @returns {string} отформатированное число
 */
export function formatNumber(value) {
  if (typeof value === 'string') {
    if (value === 'Error') return value;
    return value;
  }

  // Форматирование можно расширить по необходимости
  return String(value);
}
