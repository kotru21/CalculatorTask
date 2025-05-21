// Этот файл содержит пример теста для отображения калькулятора

describe('Отображение калькулятора', () => {
  // Настройка перед каждым тестом
  beforeEach(() => {
    // Создаем фиктивную DOM-структуру для тестов
    document.body.innerHTML = `
      <div id="calculator">
        <div id="result">0</div>
      </div>
    `;
  });

  test('Начальное значение дисплея должно быть "0"', () => {
    const display = document.getElementById('result');
    expect(display.textContent).toBe('0');
  });

  test('Обновление дисплея', () => {
    // Этот тест будет использоваться позже, когда мы реализуем функцию обновления дисплея
    // Пример: updateDisplay('5');
    // Пока что просто меняем содержимое вручную для демонстрации:
    const display = document.getElementById('result');
    display.textContent = '5';
    expect(display.textContent).toBe('5');
  });
});
