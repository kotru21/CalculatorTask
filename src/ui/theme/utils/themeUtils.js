/**
 * Утилиты для работы с темами
 */
import { THEME_VARIABLES } from '../constants/themeTypes';

/**
 * Проверяет, является ли объект валидной темой
 * @param {Object} theme - Объект темы для проверки
 * @returns {boolean} - true, если тема валидна
 */
export function validateTheme(theme) {
  if (!theme || typeof theme !== 'object') {
    return false;
  }

  // Проверяем обязательные поля
  if (!theme.id || !theme.name || !theme.variables) {
    return false;
  }

  // Проверяем, что variables - это объект
  if (typeof theme.variables !== 'object') {
    return false;
  }

  // Получаем все допустимые CSS переменные
  const allVariables = [
    ...Object.keys(THEME_VARIABLES.MAIN_COLORS),
    ...Object.keys(THEME_VARIABLES.BUTTONS),
    ...Object.keys(THEME_VARIABLES.HISTORY),
  ];

  // Проверяем, что все переменные темы существуют в допустимом списке
  const themeVariables = Object.keys(theme.variables);
  return themeVariables.every((variable) => allVariables.includes(variable));
}

/**
 * Создает глубокую копию темы
 * @param {Object} theme - Исходная тема
 * @returns {Object} - Копия темы
 */
export function cloneTheme(theme) {
  return {
    ...theme,
    variables: { ...theme.variables },
  };
}

/**
 * Генерирует уникальный ID для темы
 * @param {string} baseName - Базовое имя для генерации ID
 * @param {Array} existingThemes - Массив существующих тем
 * @returns {string} - Уникальный ID
 */
export function generateThemeId(baseName, existingThemes = []) {
  const baseId = baseName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  let id = baseId;
  let counter = 1;

  const existingIds = existingThemes.map((theme) => theme.id);
  while (existingIds.includes(id)) {
    id = `${baseId}_${counter}`;
    counter += 1;
  }

  return id;
}

/**
 * Применяет CSS переменные темы к документу
 * @param {Object} themeVariables - Объект с CSS переменными
 */
export function applyCSSVariables(themeVariables) {
  const root = document.documentElement;
  Object.entries(themeVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Создает событие изменения темы
 * @param {Object} theme - Применяемая тема
 * @param {string} eventType - Тип события
 * @returns {CustomEvent} - Созданное событие
 */
export function createThemeEvent(theme, eventType) {
  return new CustomEvent(eventType, {
    detail: {
      theme,
      timestamp: Date.now(),
    },
  });
}

/**
 * Конвертирует объект темы в CSS-строку
 * @param {Object} theme - Тема для конвертации
 * @returns {string} - CSS-строка с переменными
 */
export function themeToCSSString(theme) {
  if (!theme || !theme.variables) {
    return '';
  }

  const cssVariables = Object.entries(theme.variables)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');

  return `:root {\n${cssVariables}\n}`;
}

/**
 * Парсит CSS-строку и извлекает переменные темы
 * @param {string} cssString - CSS-строка с переменными
 * @returns {Object} - Объект с переменными
 */
export function parseCSSVariables(cssString) {
  const variables = {};
  const variableRegex = /--[\w-]+:\s*[^;]+/g;
  const matches = cssString.match(variableRegex);

  if (matches) {
    matches.forEach((match) => {
      const [property, value] = match.split(':').map((s) => s.trim());
      variables[property] = value;
    });
  }

  return variables;
}
