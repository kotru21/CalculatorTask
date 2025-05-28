/**
 * Типы и константы для системы тем
 */

// Типы тем
export const THEME_TYPES = {
  PREDEFINED: 'predefined',
  CUSTOM: 'custom',
};

// Ключи для localStorage
export const STORAGE_KEYS = {
  CURRENT_THEME: 'calculator_current_theme',
  CUSTOM_THEMES: 'calculator_custom_themes',
};

// События системы тем
export const THEME_EVENTS = {
  THEME_CHANGED: 'themeChanged',
  THEME_CREATED: 'themeCreated',
  THEME_UPDATED: 'themeUpdated',
  THEME_DELETED: 'themeDeleted',
  SYSTEM_INITIALIZED: 'themeSystemInitialized',
};

// CSS переменные по категориям
export const THEME_VARIABLES = {
  MAIN_COLORS: {
    '--bg-body': { label: 'Фон страницы', type: 'color' },
    '--bg-calculator': { label: 'Фон калькулятора', type: 'color' },
    '--bg-display': { label: 'Фон дисплея', type: 'color' },
    '--color-display': { label: 'Цвет текста дисплея', type: 'color' },
    '--color-expression': { label: 'Цвет выражения', type: 'color' },
    '--color-memory': { label: 'Цвет индикатора памяти', type: 'color' },
  },
  BUTTONS: {
    '--bg-button': { label: 'Фон обычных кнопок', type: 'color' },
    '--bg-button-hover': { label: 'Фон кнопок при наведении', type: 'color' },
    '--bg-button-active': { label: 'Фон активных кнопок', type: 'color' },
    '--bg-button-operation': { label: 'Фон кнопок операций', type: 'color' },
    '--bg-button-operation-hover': { label: 'Фон операций при наведении', type: 'color' },
    '--bg-button-memory': { label: 'Фон кнопок памяти', type: 'color' },
    '--bg-button-memory-hover': { label: 'Фон памяти при наведении', type: 'color' },
    '--bg-button-calculate': { label: 'Фон кнопки "="', type: 'color' },
    '--bg-button-calculate-hover': { label: 'Фон "=" при наведении', type: 'color' },
    '--bg-button-clear': { label: 'Фон кнопки очистки', type: 'color' },
    '--bg-button-clear-hover': { label: 'Фон очистки при наведении', type: 'color' },
    '--bg-button-scientific': { label: 'Фон научных функций', type: 'color' },
    '--bg-button-scientific-hover': { label: 'Фон научных при наведении', type: 'color' },
  },
  HISTORY: {
    '--bg-history': { label: 'Фон панели истории', type: 'color' },
    '--bg-history-header': { label: 'Фон заголовка истории', type: 'color' },
    '--color-history-header': { label: 'Цвет заголовка истории', type: 'color' },
    '--color-history-button': { label: 'Цвет кнопок истории', type: 'color' },
    '--color-history-button-hover': { label: 'Цвет кнопок при наведении', type: 'color' },
    '--bg-history-item-hover': { label: 'Фон элемента при наведении', type: 'color' },
    '--color-history-expression': { label: 'Цвет выражений истории', type: 'color' },
    '--color-history-result': { label: 'Цвет результатов истории', type: 'color' },
    '--border-history-item': { label: 'Цвет границ элементов', type: 'color' },
  },
};

// Группировка переменных для UI
export const THEME_FIELD_GROUPS = {
  'Основные цвета': THEME_VARIABLES.MAIN_COLORS,
  Кнопки: THEME_VARIABLES.BUTTONS,
  История: THEME_VARIABLES.HISTORY,
};

// Значения по умолчанию
export const DEFAULT_THEME_ID = 'light';
