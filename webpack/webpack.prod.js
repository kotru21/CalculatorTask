const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  // Объединяем с общими настройками
  mode: "production", // Режим продакшена - с оптимизациями
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Извлечение CSS в отдельные файлы
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Название CSS-файла с хешем
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        // Минимизация JS
        extractComments: false, // Не извлекать комментарии в отдельный файл
      }),
    ],
    // Остальные оптимизации для уменьшения размера файлов
    minimize: true, // Включить минимизацию
    concatenateModules: true, // Объединение модулей в один скоуп
  },
});
