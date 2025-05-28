/**
 * Модуль для работы с локальным хранилищем тем
 */
export class ThemeStorage {
  constructor() {
    this.STORAGE_KEYS = {
      CURRENT_THEME: 'calculator_current_theme',
      CUSTOM_THEMES: 'calculator_custom_themes',
    };
  }

  /**
   * Сохраняет ID текущей темы
   * @param {string} themeId - ID темы
   */
  saveCurrentTheme(themeId) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.CURRENT_THEME, themeId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Не удалось сохранить текущую тему:', error);
    }
  }

  /**
   * Загружает ID текущей темы
   * @returns {string} - ID темы или 'light' по умолчанию
   */
  loadCurrentTheme() {
    try {
      return localStorage.getItem(this.STORAGE_KEYS.CURRENT_THEME) || 'light';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Не удалось загрузить текущую тему:', error);
      return 'light';
    }
  }

  /**
   * Сохраняет пользовательские темы
   * @param {Array} themes - Массив пользовательских тем
   */
  saveCustomThemes(themes) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(themes));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Не удалось сохранить пользовательские темы:', error);
    }
  }

  /**
   * Загружает пользовательские темы
   * @returns {Array} - Массив пользовательских тем
   */
  loadCustomThemes() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.CUSTOM_THEMES);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Не удалось загрузить пользовательские темы:', error);
      return [];
    }
  }

  /**
   * Очищает все данные тем из localStorage
   */
  clearAll() {
    try {
      localStorage.removeItem(this.STORAGE_KEYS.CURRENT_THEME);
      localStorage.removeItem(this.STORAGE_KEYS.CUSTOM_THEMES);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Не удалось очистить данные тем:', error);
    }
  }
}
