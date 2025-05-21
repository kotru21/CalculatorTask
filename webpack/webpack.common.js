const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Точка входа в приложение
  output: {
    path: path.resolve(__dirname, "../dist"), // Путь для вывода файлов
    filename: "js/bundle.[contenthash].js", // Название выходного JS-файла с хешем для кеширования
    clean: true, // Очистка папки перед сборкой
  },
  module: {
    rules: [
      // Правила обработки разных типов файлов
      {
        test: /\.js$/, // Для всех JS-файлов
        exclude: /node_modules/, // Кроме node_modules
        use: {
          loader: "babel-loader", // Использовать babel для транспиляции
          options: {
            presets: ["@babel/preset-env"], // Пресет для поддержки всех современных возможностей JS
          },
        },
      },
      {
        test: /\.css$/, // Для CSS-файлов
        use: ["style-loader", "css-loader"], // Обработка CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Генерация HTML-файла
      template: "./src/index.html", // На основе нашего шаблона
      filename: "index.html", // Название выходного файла
    }),
  ],
};
