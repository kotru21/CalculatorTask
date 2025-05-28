/**
 * Компонент UI для выбора и управления темами
 */
export class ThemeSelector {
  constructor(themeManager) {
    this.themeManager = themeManager;
    this.container = null;
    this.isOpen = false;
  }

  /**
   * Инициализация компонента
   */
  init() {
    this.createSelectorButton();
    this.createDropdown();
    this.setupEventListeners();
  }

  /**
   * Создает кнопку селектора тем
   */
  createSelectorButton() {
    const button = document.createElement('button');
    button.className = 'theme-selector-btn';
    button.innerHTML = '🎨';
    button.title = 'Выбрать тему';
    button.setAttribute('aria-label', 'Выбрать тему');

    // Добавляем кнопку в header калькулятора
    const calculatorDisplay = document.querySelector('.calculator-display');
    if (calculatorDisplay) {
      calculatorDisplay.appendChild(button);
    }

    this.selectorButton = button;
  }

  /**
   * Создает выпадающий список тем
   */
  createDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'theme-dropdown';
    dropdown.innerHTML = `
      <div class="theme-dropdown-header">
        <h3>Выбор темы</h3>
        <button class="theme-close-btn" aria-label="Закрыть">×</button>
      </div>
      <div class="theme-dropdown-content">
        <div class="theme-section">
          <h4>Предустановленные темы</h4>
          <div class="theme-list predefined-themes"></div>
        </div>
        <div class="theme-section">
          <h4>Пользовательские темы</h4>
          <div class="theme-list custom-themes"></div>
          <button class="create-theme-btn">
            <span>+ Создать новую тему</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dropdown);
    this.dropdown = dropdown;

    this.populateThemes();
  }

  /**
   * Заполняет списки тем
   */
  populateThemes() {
    const predefinedContainer = this.dropdown.querySelector('.predefined-themes');
    const customContainer = this.dropdown.querySelector('.custom-themes');

    // Очищаем контейнеры
    predefinedContainer.innerHTML = '';
    customContainer.innerHTML = '';

    const allThemes = this.themeManager.getAllThemes();
    const currentTheme = this.themeManager.getCurrentTheme();

    allThemes.forEach((theme) => {
      const themeItem = this.createThemeItem(theme, currentTheme);

      if (theme.isCustom) {
        customContainer.appendChild(themeItem);
      } else {
        predefinedContainer.appendChild(themeItem);
      }
    });
  }

  /**
   * Создает элемент темы
   * @param {Object} theme - Объект темы
   * @param {Object} currentTheme - Текущая тема
   * @returns {HTMLElement} - Элемент темы
   */
  createThemeItem(theme, currentTheme) {
    const item = document.createElement('div');
    item.className = 'theme-item';
    if (currentTheme && theme.id === currentTheme.id) {
      item.classList.add('active');
    }

    const preview = this.createThemePreview(theme);

    item.innerHTML = `
      <div class="theme-preview-container">
        ${preview}
      </div>
      <div class="theme-info">
        <span class="theme-name">${theme.name}</span>
        <div class="theme-actions">
          <button class="apply-theme-btn" data-theme-id="${theme.id}" title="Применить тему">
            ✓
          </button>
          ${
            theme.isCustom
              ? `
            <button class="edit-theme-btn" data-theme-id="${theme.id}" title="Редактировать">
              ✏️
            </button>
            <button class="delete-theme-btn" data-theme-id="${theme.id}" title="Удалить">
              🗑️
            </button>
          `
              : ''
          }
        </div>
      </div>
    `;

    return item;
  }

  /**
   * Создает превью темы
   * @param {Object} theme - Объект темы
   * @returns {string} - HTML превью
   */
  createThemePreview(theme) {
    const vars = theme.variables;
    return `
      <div class="theme-preview" style="
        background: ${vars['--bg-calculator'] || '#ffffff'};
        border: 2px solid ${vars['--bg-display'] || '#283747'};
      ">
        <div class="preview-display" style="
          background: ${vars['--bg-display'] || '#283747'};
          color: ${vars['--color-display'] || '#ffffff'};
        ">0</div>        <div class="preview-buttons">
          <div class="preview-btn" style="background: ${vars['--bg-button'] || '#f0f0f0'};"></div>
          <div class="preview-btn" style="background: ${
            vars['--bg-button-operation'] || '#f39c12'
          };"></div>
          <div class="preview-btn" style="background: ${
            vars['--bg-button-memory'] || '#3498db'
          };"></div>
        </div>
      </div>
    `;
  }

  /**
   * Настройка обработчиков событий
   */
  setupEventListeners() {
    // Открытие/закрытие селектора
    this.selectorButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Закрытие селектора
    this.dropdown.querySelector('.theme-close-btn').addEventListener('click', () => {
      this.close();
    });

    // Применение темы
    this.dropdown.addEventListener('click', (e) => {
      if (e.target.classList.contains('apply-theme-btn')) {
        const { themeId } = e.target.dataset;
        this.themeManager.applyTheme(themeId);
        this.populateThemes(); // Обновляем активную тему
      }

      if (e.target.classList.contains('edit-theme-btn')) {
        const { themeId } = e.target.dataset;
        this.openThemeEditor(themeId);
      }

      if (e.target.classList.contains('delete-theme-btn')) {
        const { themeId } = e.target.dataset;
        this.deleteTheme(themeId);
      }

      if (e.target.classList.contains('create-theme-btn')) {
        this.openThemeEditor();
      }
    });

    // Закрытие при клике вне области
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.dropdown.contains(e.target)) {
        this.close();
      }
    });

    // Обновление при изменении темы
    document.addEventListener('themeChanged', () => {
      this.populateThemes();
    });
  }

  /**
   * Открывает/закрывает селектор
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Открывает селектор
   */
  open() {
    this.dropdown.classList.add('open');
    this.isOpen = true;
    this.populateThemes(); // Обновляем список при открытии
  }

  /**
   * Закрывает селектор
   */
  close() {
    this.dropdown.classList.remove('open');
    this.isOpen = false;
  }

  /**
   * Удаляет пользовательскую тему
   * @param {string} themeId - ID темы
   */ deleteTheme(themeId) {
    /* eslint-disable no-restricted-globals, no-alert */
    if (confirm('Вы уверены, что хотите удалить эту тему?')) {
      try {
        this.themeManager.deleteCustomTheme(themeId);
        this.populateThemes();
      } catch (error) {
        alert(`Ошибка удаления темы: ${error.message}`);
      }
    }
    /* eslint-enable no-restricted-globals, no-alert */
  }

  /**
   * Открывает редактор тем
   * @param {string} themeId - ID темы (для редактирования) или undefined (для создания новой)
   */ openThemeEditor(themeId = null) {
    // Эта функция будет реализована в следующем компоненте
    /* eslint-disable-next-line no-console */
    console.log('Открываем редактор тем для:', themeId || 'новой темы');

    // Временно создаем событие для показа, что функция вызывается
    const event = new CustomEvent('openThemeEditor', {
      detail: { themeId },
    });
    document.dispatchEvent(event);
  }
}
