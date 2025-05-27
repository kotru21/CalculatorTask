/**
 * Менеджер тем для калькулятора
 * Управляет переключением между предустановленными и пользовательскими темами
 */
import { predefinedThemes, defaultCustomTheme } from '../../styles/themes';
import { ThemeStorage } from './ThemeStorage';

export class ThemeManager {
  constructor() {
    this.storage = new ThemeStorage();
    this.customThemes = [];
    this.currentTheme = null;

    // Загружаем пользовательские темы при инициализации
    this.loadCustomThemes();
  }

  /**
   * Инициализация менеджера тем
   */
  init() {
    const savedThemeId = this.storage.loadCurrentTheme();
    this.applyTheme(savedThemeId);
  }

  /**
   * Применяет тему по ID
   * @param {string} themeId - ID темы
   */
  applyTheme(themeId) {
    const theme = this.getThemeById(themeId);
    if (!theme) {
      /* eslint-disable-next-line no-console */
      console.warn(`Тема с ID ${themeId} не найдена, применяется светлая тема`);
      this.applyTheme('light');
      return;
    }

    // Применяем CSS переменные
    const root = document.documentElement;
    Object.entries(theme.variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    this.currentTheme = theme;
    this.storage.saveCurrentTheme(themeId);

    // Генерируем событие изменения темы
    this.dispatchThemeChangeEvent(theme);
  }

  /**
   * Получает тему по ID
   * @param {string} themeId - ID темы
   * @returns {Object|null} - Объект темы или null
   */
  getThemeById(themeId) {
    // Ищем среди предустановленных тем
    if (predefinedThemes[themeId]) {
      return predefinedThemes[themeId];
    }

    // Ищем среди пользовательских тем
    return this.customThemes.find((theme) => theme.id === themeId) || null;
  }

  /**
   * Возвращает все доступные темы
   * @returns {Array} - Массив всех тем
   */
  getAllThemes() {
    const predefined = Object.values(predefinedThemes);
    return [...predefined, ...this.customThemes];
  }

  /**
   * Создает новую пользовательскую тему
   * @param {Object} themeData - Данные темы
   * @returns {Object} - Созданная тема
   */
  createCustomTheme(themeData) {
    const theme = {
      ...defaultCustomTheme,
      ...themeData,
      id: this.generateThemeId(),
      isCustom: true,
    };

    this.customThemes.push(theme);
    this.saveCustomThemes();

    return theme;
  }

  /**
   * Обновляет пользовательскую тему
   * @param {string} themeId - ID темы
   * @param {Object} updates - Обновления
   */
  updateCustomTheme(themeId, updates) {
    const themeIndex = this.customThemes.findIndex((theme) => theme.id === themeId);
    if (themeIndex === -1) {
      throw new Error(`Пользовательская тема с ID ${themeId} не найдена`);
    }

    this.customThemes[themeIndex] = {
      ...this.customThemes[themeIndex],
      ...updates,
    };

    this.saveCustomThemes();

    // Если обновляемая тема является текущей, применяем изменения
    if (this.currentTheme && this.currentTheme.id === themeId) {
      this.applyTheme(themeId);
    }
  }

  /**
   * Удаляет пользовательскую тему
   * @param {string} themeId - ID темы
   */
  deleteCustomTheme(themeId) {
    const themeIndex = this.customThemes.findIndex((theme) => theme.id === themeId);
    if (themeIndex === -1) {
      throw new Error(`Пользовательская тема с ID ${themeId} не найдена`);
    }

    this.customThemes.splice(themeIndex, 1);
    this.saveCustomThemes();

    // Если удаляемая тема является текущей, переключаемся на светлую
    if (this.currentTheme && this.currentTheme.id === themeId) {
      this.applyTheme('light');
    }
  }

  /**
   * Загружает пользовательские темы из localStorage
   */
  loadCustomThemes() {
    this.customThemes = this.storage.loadCustomThemes();
  }

  /**
   * Сохраняет пользовательские темы в localStorage
   */
  saveCustomThemes() {
    this.storage.saveCustomThemes(this.customThemes);
  }

  /**
   * Генерирует уникальный ID для темы
   * @returns {string} - Уникальный ID
   */
  generateThemeId() {
    return `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Возвращает текущую тему
   * @returns {Object|null} - Текущая тема
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Проверяет, является ли тема пользовательской
   * @param {string} themeId - ID темы
   * @returns {boolean}
   */
  isCustomTheme(themeId) {
    return this.customThemes.some((theme) => theme.id === themeId);
  }

  /**
   * Создает событие изменения темы
   * @param {Object} theme - Применённая тема
   */
  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themeChanged', {
      detail: { theme },
    });
    document.dispatchEvent(event);
  }

  /**
   * Экспортирует тему в JSON
   * @param {string} themeId - ID темы
   * @returns {string} - JSON строка
   */
  exportTheme(themeId) {
    const theme = this.getThemeById(themeId);
    if (!theme) {
      throw new Error(`Тема с ID ${themeId} не найдена`);
    }
    return JSON.stringify(theme, null, 2);
  }

  /**
   * Импортирует тему из JSON
   * @param {string} jsonString - JSON строка темы
   * @returns {Object} - Импортированная тема
   */
  importTheme(jsonString) {
    try {
      const themeData = JSON.parse(jsonString);

      // Валидация основных полей
      if (!themeData.name || !themeData.variables) {
        throw new Error('Некорректный формат темы');
      }

      // Создаем новую тему на основе импортированных данных
      return this.createCustomTheme({
        name: themeData.name,
        variables: themeData.variables,
      });
    } catch (error) {
      throw new Error(`Ошибка импорта темы: ${error.message}`);
    }
  }
}
