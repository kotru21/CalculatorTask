/**
 * Фабрика для создания тем
 */
import { validateTheme, cloneTheme, generateThemeId } from '../utils/themeUtils';
import { lightTheme } from '../themes/lightTheme';

/**
 * Создает новую пользовательскую тему на основе существующей
 * @param {Object} baseTheme - Базовая тема
 * @param {string} name - Имя новой темы
 * @param {Array} existingThemes - Массив существующих тем
 * @returns {Object} - Новая тема
 */
export function createCustomTheme(
  baseTheme = lightTheme,
  name = 'Новая тема',
  existingThemes = []
) {
  const newTheme = cloneTheme(baseTheme);
  newTheme.id = generateThemeId(name, existingThemes);
  newTheme.name = name;
  newTheme.isCustom = true;
  newTheme.createdAt = new Date().toISOString();
  newTheme.updatedAt = new Date().toISOString();

  if (!validateTheme(newTheme)) {
    throw new Error('Не удалось создать валидную тему');
  }

  return newTheme;
}

/**
 * Создает тему из объекта переменных
 * @param {Object} variables - CSS переменные
 * @param {string} name - Имя темы
 * @param {Array} existingThemes - Массив существующих тем
 * @returns {Object} - Новая тема
 */
export function createThemeFromVariables(
  variables,
  name = 'Импортированная тема',
  existingThemes = []
) {
  const theme = {
    id: generateThemeId(name, existingThemes),
    name,
    isCustom: true,
    variables,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!validateTheme(theme)) {
    throw new Error('Переданные переменные не образуют валидную тему');
  }

  return theme;
}

/**
 * Обновляет существующую тему
 * @param {Object} theme - Тема для обновления
 * @param {Object} updates - Объект с обновлениями
 * @returns {Object} - Обновленная тема
 */
export function updateTheme(theme, updates) {
  const updatedTheme = {
    ...theme,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // Если обновляются переменные, объединяем их с существующими
  if (updates.variables) {
    updatedTheme.variables = {
      ...theme.variables,
      ...updates.variables,
    };
  }

  if (!validateTheme(updatedTheme)) {
    throw new Error('Обновления приводят к невалидной теме');
  }

  return updatedTheme;
}

/**
 * Создает шаблон пустой темы
 * @param {string} name - Имя темы
 * @param {Array} existingThemes - Массив существующих тем
 * @returns {Object} - Шаблон темы
 */
export function createThemeTemplate(name = 'Шаблон темы', existingThemes = []) {
  return createCustomTheme(lightTheme, name, existingThemes);
}
