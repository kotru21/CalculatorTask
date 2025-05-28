/**
 * Главный экспорт системы тем
 */

// Основные классы
export { ThemeSystem } from './ThemeSystem';
export { ThemeManager } from './ThemeManager';
export { ThemeSelector } from './ThemeSelector';
export { ThemeEditor } from './ThemeEditor';

// Сервисы
export { ThemeStorageService } from './services/ThemeStorageService';

// Предустановленные темы
export {
  predefinedThemes,
  predefinedThemesList,
  getPredefinedTheme,
  isPredefinedTheme,
} from './themes/index';

// Фабрики и утилиты
export {
  createCustomTheme,
  createThemeFromVariables,
  updateTheme,
  createThemeTemplate,
} from './factories/themeFactory';
export {
  validateTheme,
  cloneTheme,
  generateThemeId,
  applyCSSVariables,
  createThemeEvent,
  themeToCSSString,
  parseCSSVariables,
} from './utils/themeUtils';

// Константы и типы
export {
  THEME_TYPES,
  STORAGE_KEYS,
  THEME_EVENTS,
  THEME_VARIABLES,
  THEME_FIELD_GROUPS,
  DEFAULT_THEME_ID,
} from './constants/themeTypes';

// Шаблоны
export { defaultCustomTheme } from './templates/defaultCustomTheme';
