import { Calculator } from '../src/core/calculator';
import { Display } from '../src/ui/Display';
import { ThemeSystem } from '../src/ui/theme/ThemeSystem';

// Мокируем модули
jest.mock('../src/core/calculator');
jest.mock('../src/ui/Display');
jest.mock('../src/ui/theme/ThemeSystem');
jest.mock('../src/styles/main.css', () => ({}));

describe('index.js', () => {
  let mockDisplay;
  let mockCalculator;
  let mockThemeSystem;
  let mockAddEventListener;

  beforeEach(() => {
    // Очищаем моки перед каждым тестом
    jest.clearAllMocks();

    // Мокируем document.addEventListener
    mockAddEventListener = jest.fn();
    Object.defineProperty(document, 'addEventListener', {
      writable: true,
      value: mockAddEventListener,
    });

    // Создаем моки для методов
    mockDisplay = {
      init: jest.fn(),
    };
    mockCalculator = {
      setupEventListeners: jest.fn(),
    };
    mockThemeSystem = {
      init: jest.fn().mockResolvedValue(undefined),
    };

    Display.mockImplementation(() => mockDisplay);
    Calculator.mockImplementation(() => mockCalculator);
    ThemeSystem.mockImplementation(() => mockThemeSystem);
  });

  test('должен добавить обработчик события DOMContentLoaded при импорте модуля', async () => {
    // Динамически импортируем модуль после установки мока
    await import('../src/index');

    expect(mockAddEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });
  test('должен инициализировать Display при вызове initializeCalculator', async () => {
    const { initializeCalculator } = await import('../src/index');
    await initializeCalculator();

    expect(Display).toHaveBeenCalledTimes(1);
    expect(mockDisplay.init).toHaveBeenCalledTimes(1);
  });

  test('должен создать Calculator с display и настроить обработчики событий', async () => {
    const { initializeCalculator } = await import('../src/index');
    await initializeCalculator();

    expect(Calculator).toHaveBeenCalledWith(mockDisplay);
    expect(mockCalculator.setupEventListeners).toHaveBeenCalledTimes(1);
  });

  test('должен инициализировать ThemeSystem', async () => {
    const { initializeCalculator } = await import('../src/index');
    await initializeCalculator();

    expect(ThemeSystem).toHaveBeenCalledTimes(1);
    expect(mockThemeSystem.init).toHaveBeenCalledTimes(1);
  });

  test('должен выполнить инициализацию в правильном порядке', async () => {
    const { initializeCalculator } = await import('../src/index');
    await initializeCalculator();

    // Проверяем порядок вызовов
    const displayInitCall = mockDisplay.init.mock.invocationCallOrder[0];
    const calculatorSetupCall = mockCalculator.setupEventListeners.mock.invocationCallOrder[0];

    expect(displayInitCall).toBeLessThan(calculatorSetupCall);
  });
  test('должен возвращать объекты display, calculator и themeSystem', async () => {
    const { initializeCalculator } = await import('../src/index');
    const result = await initializeCalculator();

    expect(result).toHaveProperty('display', mockDisplay);
    expect(result).toHaveProperty('calculator', mockCalculator);
    expect(result).toHaveProperty('themeSystem');
  });
});
