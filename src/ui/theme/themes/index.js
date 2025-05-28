/**
 * Индекс предустановленных тем
 */
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { blueTheme } from './blueTheme';
import { greenTheme } from './greenTheme';

// Коллекция всех предустановленных тем
export const predefinedThemes = {
  [lightTheme.id]: lightTheme,
  [darkTheme.id]: darkTheme,
  [blueTheme.id]: blueTheme,
  [greenTheme.id]: greenTheme,
};

// Массив тем для итерации
export const predefinedThemesList = [lightTheme, darkTheme, blueTheme, greenTheme];

// Получение темы по ID
export function getPredefinedTheme(themeId) {
  return predefinedThemes[themeId] || null;
}

// Проверка, является ли тема предустановленной
export function isPredefinedTheme(themeId) {
  return themeId in predefinedThemes;
}
