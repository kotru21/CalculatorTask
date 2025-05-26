import './styles/main.css';
import { Calculator } from './core/calculator';
import { Display } from './ui/Display';

/**
 * Функция инициализации калькулятора
 */
export function initializeCalculator() {
  const display = new Display();
  display.init();

  const calculator = new Calculator(display);
  calculator.setupEventListeners();

  return { display, calculator };
}

// Инициализация калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', initializeCalculator);
