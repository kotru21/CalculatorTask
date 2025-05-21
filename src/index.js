import './styles/main.css';
import { Calculator } from './core/calculator';
import { Display } from './ui/Display';

// Инициализация калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const display = new Display();
  display.init();

  const calculator = new Calculator(display);
  calculator.setupEventListeners();
});
