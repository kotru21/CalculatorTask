/**
 * Редактор пользовательских тем
 */
import { defaultCustomTheme } from '../../styles/themes';

export class ThemeEditor {
  constructor(themeManager) {
    this.themeManager = themeManager;
    this.modal = null;
    this.currentTheme = null;
    this.isEditing = false;
    this.previewApplied = false;

    // Конфигурация полей для редактирования
    this.themeFields = {
      'Основные цвета': {
        '--bg-body': { label: 'Фон страницы', type: 'color' },
        '--bg-calculator': { label: 'Фон калькулятора', type: 'color' },
        '--bg-display': { label: 'Фон дисплея', type: 'color' },
        '--color-display': { label: 'Цвет текста дисплея', type: 'color' },
        '--color-expression': { label: 'Цвет выражения', type: 'color' },
        '--color-memory': { label: 'Цвет индикатора памяти', type: 'color' },
      },
      Кнопки: {
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
      История: {
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
  }

  /**
   * Инициализация редактора
   */
  init() {
    this.setupEventListeners();
  }

  /**
   * Настройка обработчиков событий
   */
  setupEventListeners() {
    document.addEventListener('openThemeEditor', (e) => {
      const { themeId } = e.detail;
      this.open(themeId);
    });
  }

  /**
   * Открывает редактор тем
   * @param {string} themeId - ID темы для редактирования (null для создания новой)
   */
  open(themeId = null) {
    this.isEditing = !!themeId;
    if (this.isEditing) {
      this.currentTheme = this.themeManager.getThemeById(themeId);
      if (!this.currentTheme) {
        /* eslint-disable-next-line no-alert */
        alert('Тема не найдена');
        return;
      }
    } else {
      // Создаем новую тему на основе шаблона
      this.currentTheme = {
        ...defaultCustomTheme,
        id: this.themeManager.generateThemeId(),
        name: 'Новая тема',
      };
    }

    this.createModal();
    this.populateForm();
    this.showModal();
  }

  /**
   * Создает модальное окно редактора
   */
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'theme-editor-modal';

    modal.innerHTML = `
      <div class="theme-editor-content">
        <div class="theme-editor-header">
          <h2>${this.isEditing ? 'Редактировать тему' : 'Создать новую тему'}</h2>
          <button class="theme-editor-close" aria-label="Закрыть">×</button>
        </div>
        
        <div class="theme-editor-body">
          <div class="theme-editor-sidebar">
            <div class="theme-basic-info">
              <label>
                <span>Название темы:</span>
                <input
                  type="text"
                  class="theme-name-input"                  value="${this.currentTheme.name}"
                  maxlength="50"
                >
              </label>
            </div>
            
            <div class="theme-preview-section">
              <h3>Предварительный просмотр</h3>
              <div class="theme-preview-live">
                <div class="preview-calculator">
                  <div class="preview-display">
                    <div class="preview-expression">2 + 2</div>
                    <div class="preview-result">4</div>
                  </div>
                  <div class="preview-buttons-grid">
                    <div class="preview-button normal">7</div>
                    <div class="preview-button normal">8</div>
                    <div class="preview-button normal">9</div>
                    <div class="preview-button operation">÷</div>
                    <div class="preview-button memory">MC</div>
                    <div class="preview-button scientific">sin</div>
                    <div class="preview-button calculate">=</div>
                    <div class="preview-button clear">C</div>
                  </div>
                </div>
              </div>
              
              <div class="theme-preview-actions">
                <button class="apply-preview-btn">Применить для предварительного просмотра</button>
                <button class="reset-preview-btn">Сбросить предварительный просмотр</button>
              </div>
            </div>
          </div>
          
          <div class="theme-editor-main">
            <div class="theme-fields-container">
              <!-- Поля будут заполнены динамически -->
            </div>
          </div>
        </div>
          <div class="theme-editor-footer">
          <div class="theme-editor-actions">
            <button class="theme-save-btn">
              ${this.isEditing ? 'Сохранить изменения' : 'Создать тему'}
            </button>
            <button class="theme-cancel-btn">Отмена</button>
          </div>
          
          <div class="theme-import-export">
            <button class="theme-export-btn">Экспорт</button>
            <label class="theme-import-btn">
              Импорт
              <input type="file" accept=".json" class="theme-import-input" style="display: none;">
            </label>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modal = modal;

    this.setupModalEventListeners();
  }

  /**
   * Заполняет форму значениями темы
   */
  populateForm() {
    const container = this.modal.querySelector('.theme-fields-container');
    container.innerHTML = '';

    Object.entries(this.themeFields).forEach(([sectionName, fields]) => {
      const section = document.createElement('div');
      section.className = 'theme-field-section';

      section.innerHTML = `
        <h3>${sectionName}</h3>
        <div class="theme-fields-grid">
          ${Object.entries(fields)
            .map(([variable, config]) => {
              const value = this.currentTheme.variables[variable] || '';
              return `
              <div class="theme-field">
                <label>
                  <span>${config.label}:</span>
                  <div class="theme-field-input">
                    <input 
                      type="${config.type}" 
                      data-variable="${variable}"
                      value="${value}"
                      class="theme-input theme-input-${config.type}">
                    ${
                      config.type === 'color'
                        ? `
                      <input 
                        type="text" 
                        data-variable="${variable}"
                        value="${value}"
                        class="theme-input theme-input-text"
                        placeholder="#000000">
                    `
                        : ''
                    }
                  </div>
                </label>
              </div>
            `;
            })
            .join('')}
        </div>
      `;

      container.appendChild(section);
    });

    this.updatePreview();
  }

  /**
   * Настройка обработчиков событий модального окна
   */
  setupModalEventListeners() {
    // Закрытие модального окна
    this.modal.querySelector('.theme-editor-close').addEventListener('click', () => {
      this.close();
    });

    this.modal.querySelector('.theme-cancel-btn').addEventListener('click', () => {
      this.close();
    });

    // Изменение полей
    this.modal.addEventListener('input', (e) => {
      if (e.target.classList.contains('theme-input')) {
        const { variable } = e.target.dataset;
        const { value } = e.target;

        // Синхронизируем color input и text input
        if (e.target.type === 'color') {
          const textInput = this.modal.querySelector(
            `input[type="text"][data-variable="${variable}"]`
          );
          if (textInput) {
            textInput.value = value;
          }
        } else if (e.target.type === 'text' && e.target.classList.contains('theme-input-text')) {
          const colorInput = this.modal.querySelector(
            `input[type="color"][data-variable="${variable}"]`
          );
          if (colorInput && this.isValidColor(value)) {
            colorInput.value = value;
          }
        }

        this.currentTheme.variables[variable] = value;
        this.updatePreview();
      }

      if (e.target.classList.contains('theme-name-input')) {
        this.currentTheme.name = e.target.value;
      }
    });

    // Применение предварительного просмотра
    this.modal.querySelector('.apply-preview-btn').addEventListener('click', () => {
      this.applyPreview();
    });

    this.modal.querySelector('.reset-preview-btn').addEventListener('click', () => {
      this.resetPreview();
    });

    // Сохранение темы
    this.modal.querySelector('.theme-save-btn').addEventListener('click', () => {
      this.saveTheme();
    });

    // Экспорт темы
    this.modal.querySelector('.theme-export-btn').addEventListener('click', () => {
      this.exportTheme();
    });

    // Импорт темы
    this.modal.querySelector('.theme-import-input').addEventListener('change', (e) => {
      this.importTheme(e.target.files[0]);
    });

    // Закрытие при клике вне области
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  /**
   * Обновляет предварительный просмотр
   */
  updatePreview() {
    const preview = this.modal.querySelector('.theme-preview-live');
    if (!preview) return;

    const vars = this.currentTheme.variables;

    // Применяем стили к превью
    preview.style.setProperty('--bg-calculator', vars['--bg-calculator'] || '#ffffff');
    preview.style.setProperty('--bg-display', vars['--bg-display'] || '#283747');
    preview.style.setProperty('--color-display', vars['--color-display'] || '#ffffff');
    preview.style.setProperty('--color-expression', vars['--color-expression'] || '#aab7c4');
    preview.style.setProperty('--bg-button', vars['--bg-button'] || '#f0f0f0');
    preview.style.setProperty('--bg-button-operation', vars['--bg-button-operation'] || '#f39c12');
    preview.style.setProperty('--bg-button-memory', vars['--bg-button-memory'] || '#3498db');
    preview.style.setProperty(
      '--bg-button-scientific',
      vars['--bg-button-scientific'] || '#9b59b6'
    );
    preview.style.setProperty('--bg-button-calculate', vars['--bg-button-calculate'] || '#2ecc71');
    preview.style.setProperty('--bg-button-clear', vars['--bg-button-clear'] || '#e74c3c');
  }

  /**
   * Применяет тему для предварительного просмотра на весь калькулятор
   */
  applyPreview() {
    const root = document.documentElement;
    Object.entries(this.currentTheme.variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    this.previewApplied = true;
  }

  /**
   * Сбрасывает предварительный просмотр
   */
  resetPreview() {
    if (this.previewApplied) {
      const currentTheme = this.themeManager.getCurrentTheme();
      if (currentTheme) {
        this.themeManager.applyTheme(currentTheme.id);
      }
      this.previewApplied = false;
    }
  }

  /**
   * Сохраняет тему
   */
  saveTheme() {
    try {
      // Валидация
      if (!this.currentTheme.name.trim()) {
        /* eslint-disable-next-line no-alert */
        alert('Пожалуйста, введите название темы');
        return;
      }

      if (this.isEditing) {
        this.themeManager.updateCustomTheme(this.currentTheme.id, this.currentTheme);
      } else {
        this.themeManager.createCustomTheme(this.currentTheme);
      }

      // Применяем тему если был предварительный просмотр
      if (this.previewApplied) {
        this.themeManager.applyTheme(this.currentTheme.id);
      }

      this.close();

      // Отправляем событие о сохранении темы
      const event = new CustomEvent('themeSaved', {
        detail: { theme: this.currentTheme },
      });
      document.dispatchEvent(event);
    } catch (error) {
      /* eslint-disable-next-line no-alert */
      alert(`Ошибка сохранения темы: ${error.message}`);
    }
  }

  /**
   * Экспортирует тему в JSON файл
   */
  exportTheme() {
    try {
      const dataStr = JSON.stringify(this.currentTheme, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `${this.currentTheme.name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}_theme.json`;
      link.click();

      URL.revokeObjectURL(link.href);
    } catch (error) {
      /* eslint-disable-next-line no-alert */
      alert(`Ошибка экспорта темы: ${error.message}`);
    }
  }

  /**
   * Импортирует тему из JSON файла
   */
  async importTheme(file) {
    if (!file) return;

    try {
      const text = await file.text();
      const themeData = JSON.parse(text);

      // Валидация базовой структуры
      if (!themeData.name || !themeData.variables) {
        throw new Error('Некорректный формат файла темы');
      }

      // Заполняем форму импортированными данными
      this.currentTheme = {
        ...this.currentTheme,
        name: themeData.name,
        variables: { ...this.currentTheme.variables, ...themeData.variables },
      };

      this.populateForm();
    } catch (error) {
      /* eslint-disable-next-line no-alert */
      alert(`Ошибка импорта темы: ${error.message}`);
    }
  }

  /**
   * Проверяет, является ли строка корректным цветом
   */
  isValidColor(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  }

  /**
   * Показывает модальное окно
   */
  showModal() {
    this.modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

  /**
   * Закрывает редактор
   */
  close() {
    if (this.previewApplied) {
      this.resetPreview();
    }

    if (this.modal) {
      this.modal.classList.remove('open');
      document.body.classList.remove('modal-open');

      setTimeout(() => {
        document.body.removeChild(this.modal);
        this.modal = null;
      }, 300);
    }
  }
}
