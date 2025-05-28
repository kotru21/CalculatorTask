import './styles/main.css';
import './styles/theme-selector.css';
import './styles/theme-editor.css';
import { Calculator } from './core/calculator';
import { Display } from './ui/Display';
import { ThemeSystem } from './ui/theme/ThemeSystem';

/**
 * Функция инициализации калькулятора
 */
export async function initializeCalculator() {
  const display = new Display();
  display.init();

  const calculator = new Calculator(display);
  calculator.setupEventListeners();

  // Инициализируем систему тем
  const themeSystem = new ThemeSystem();
  await themeSystem.init();

  return { display, calculator, themeSystem };
}

// Инициализация калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeCalculator);
