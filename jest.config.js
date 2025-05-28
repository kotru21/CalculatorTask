module.exports = {
  // Каталоги для поиска тестов
  testMatch: ['**/tests/**/*.test.js', '**/__tests__/**/*.js'],

  // Покрытие кода
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**'],

  // Среда выполнения тестов
  testEnvironment: 'jsdom',

  // Преобразователи для обработки различных типов файлов
  transform: {
    '^.+\\.js$': 'babel-jest',
  },

  // Игнорирование определенных директорий
  modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],

  // Мокирование CSS и других статических файлов
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Настройка для отчетов о тестах
  verbose: true,
};
