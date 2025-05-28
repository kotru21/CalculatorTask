/**
 * Модуль для работы с хранилищем тем
 */
import { STORAGE_KEYS } from '../constants/themeTypes';

export class ThemeStorageService {
  constructor() {
    this.storageKeys = STORAGE_KEYS;
  }

  /**
   * Сохраняет ID текущей темы
   * @param {string} themeId - ID темы
   * @returns {boolean} - успешность операции
   */
  saveCurrentTheme(themeId) {
    try {
      localStorage.setItem(this.storageKeys.CURRENT_THEME, themeId);
      return true;
    } catch (error) {
      // Тихо обрабатываем ошибку сохранения темы
      return false;
    }
  }

  /**
   * Загружает ID текущей темы
   * @param {string} defaultThemeId - ID темы по умолчанию
   * @returns {string} - ID темы
   */
  loadCurrentTheme(defaultThemeId = 'light') {
    try {
      return localStorage.getItem(this.storageKeys.CURRENT_THEME) || defaultThemeId;
    } catch (error) {
      // Тихо обрабатываем ошибку загрузки темы
      return defaultThemeId;
    }
  }

  /**
   * Сохраняет пользовательские темы
   * @param {Array} themes - Массив пользовательских тем
   * @returns {boolean} - успешность операции
   */
  saveCustomThemes(themes) {
    try {
      localStorage.setItem(this.storageKeys.CUSTOM_THEMES, JSON.stringify(themes));
      return true;
    } catch (error) {
      // Тихо обрабатываем ошибку сохранения пользовательских тем
      return false;
    }
  }

  /**
   * Загружает пользовательские темы
   * @returns {Array} - Массив пользовательских тем
   */
  loadCustomThemes() {
    try {
      const themesJson = localStorage.getItem(this.storageKeys.CUSTOM_THEMES);
      return themesJson ? JSON.parse(themesJson) : [];
    } catch (error) {
      // Тихо обрабатываем ошибку загрузки пользовательских тем
      return [];
    }
  }

  /**
   * Удаляет все данные тем из хранилища
   * @returns {boolean} - успешность операции
   */
  clearThemeData() {
    try {
      localStorage.removeItem(this.storageKeys.CURRENT_THEME);
      localStorage.removeItem(this.storageKeys.CUSTOM_THEMES);
      return true;
    } catch (error) {
      // Тихо обрабатываем ошибку очистки данных тем
      return false;
    }
  }

  /**
   * Экспортирует все данные тем
   * @returns {Object} - Объект с данными тем
   */
  exportThemeData() {
    return {
      currentTheme: this.loadCurrentTheme(),
      customThemes: this.loadCustomThemes(),
      exportDate: new Date().toISOString(),
    };
  }

  /**
   * Импортирует данные тем
   * @param {Object} data - Данные для импорта
   * @returns {boolean} - успешность операции
   */
  importThemeData(data) {
    try {
      if (data.currentTheme) {
        this.saveCurrentTheme(data.currentTheme);
      }
      if (Array.isArray(data.customThemes)) {
        this.saveCustomThemes(data.customThemes);
      }
      return true;
    } catch (error) {
      // Тихо обрабатываем ошибку импорта данных тем
      return false;
    }
  }
}
