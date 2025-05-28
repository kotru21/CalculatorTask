/* eslint-disable no-console */
/**
 * Главный класс системы тем
 * Координирует работу всех компонентов системы тем
 */
import { ThemeManager } from './ThemeManager';
import { ThemeSelector } from './ThemeSelector';
import { ThemeEditor } from './ThemeEditor';
import { THEME_EVENTS } from './constants/themeTypes';

export class ThemeSystem {
  constructor() {
    this.themeManager = null;
    this.themeSelector = null;
    this.themeEditor = null;
    this.isInitialized = false;
  }

  /**
   * Инициализация системы тем
   */ async init() {
    if (this.isInitialized) {
      return;
    }

    // Инициализируем менеджер тем
    this.themeManager = new ThemeManager();
    this.themeManager.init();

    // Инициализируем селектор тем
    this.themeSelector = new ThemeSelector(this.themeManager);
    this.themeSelector.init();

    // Инициализируем редактор тем
    this.themeEditor = new ThemeEditor(this.themeManager);
    this.themeEditor.init();

    this.isInitialized = true;

    // Генерируем событие успешной инициализации
    this.dispatchInitEvent();
  }

  /**
   * Генерирует событие инициализации
   */
  dispatchInitEvent() {
    const event = new CustomEvent(THEME_EVENTS.SYSTEM_INITIALIZED, {
      detail: {
        themeManager: this.themeManager,
        themeSelector: this.themeSelector,
        themeEditor: this.themeEditor,
      },
    });
    document.dispatchEvent(event);
  }

  /**
   * Возвращает менеджер тем
   */
  getThemeManager() {
    return this.themeManager;
  }

  /**
   * Возвращает селектор тем
   */
  getThemeSelector() {
    return this.themeSelector;
  }

  /**
   * Возвращает редактор тем
   */
  getThemeEditor() {
    return this.themeEditor;
  }

  /**
   * Применяет тему по ID
   * @param {string} themeId - ID темы
   */ applyTheme(themeId) {
    if (!this.isInitialized || !this.themeManager) {
      /* eslint-disable-next-line no-console */
      console.warn('Система тем не инициализирована');
      return;
    }

    this.themeManager.applyTheme(themeId);
  }

  /**
   * Открывает селектор тем
   */
  openThemeSelector() {
    if (!this.isInitialized || !this.themeSelector) {
      console.warn('Селектор тем не инициализирован');
      return;
    }

    this.themeSelector.open();
  }

  /**
   * Открывает редактор тем
   * @param {string} themeId - ID темы для редактирования (опционально)
   */
  openThemeEditor(themeId = null) {
    if (!this.isInitialized || !this.themeEditor) {
      console.warn('Редактор тем не инициализирован');
      return;
    }

    this.themeEditor.open(themeId);
  }

  /**
   * Получает все доступные темы
   * @returns {Array} - Массив тем
   */
  getAllThemes() {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return [];
    }

    return this.themeManager.getAllThemes();
  }

  /**
   * Получает текущую тему
   * @returns {Object|null} - Текущая тема
   */
  getCurrentTheme() {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return null;
    }

    return this.themeManager.getCurrentTheme();
  }

  /**
   * Создает новую пользовательскую тему
   * @param {Object} themeData - Данные темы
   * @returns {Object} - Созданная тема
   */
  createCustomTheme(themeData) {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return null;
    }

    return this.themeManager.createCustomTheme(themeData);
  }

  /**
   * Удаляет пользовательскую тему
   * @param {string} themeId - ID темы
   */
  deleteCustomTheme(themeId) {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return;
    }

    this.themeManager.deleteCustomTheme(themeId);
  }

  /**
   * Экспортирует тему
   * @param {string} themeId - ID темы
   * @returns {string} - JSON строка темы
   */
  exportTheme(themeId) {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return null;
    }

    return this.themeManager.exportTheme(themeId);
  }

  /**
   * Импортирует тему
   * @param {string} jsonString - JSON строка темы
   * @returns {Object} - Импортированная тема
   */
  importTheme(jsonString) {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return null;
    }

    return this.themeManager.importTheme(jsonString);
  }

  /**
   * Проверяет, инициализирована ли система
   * @returns {boolean}
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Очищает все данные тем
   */
  clearAllThemeData() {
    if (!this.isInitialized || !this.themeManager) {
      console.warn('Система тем не инициализирована');
      return;
    }

    this.themeManager.storage.clearAll();

    // Применяем светлую тему по умолчанию
    this.themeManager.applyTheme('light');
  }

  /**
   * Уничтожает систему тем
   */
  destroy() {
    if (!this.isInitialized) {
      return;
    }

    // Закрываем все открытые компоненты
    if (this.themeSelector) {
      this.themeSelector.close();
    }

    if (this.themeEditor) {
      this.themeEditor.close();
    }

    // Очищаем ссылки
    this.themeManager = null;
    this.themeSelector = null;
    this.themeEditor = null;
    this.isInitialized = false;

    console.log('Система тем была уничтожена');
  }
}
