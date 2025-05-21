const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Объединяем с общими настройками
  mode: 'development', // Режим разработки - без минимизации, с дополнительной информацией
  devtool: 'inline-source-map', // Карты исходного кода для отладки
  devServer: {
    static: './dist', // Откуда раздавать файлы
    hot: true, // Горячая замена модулей - обновление без перезагрузки страницы
    open: true, // Автоматически открывать браузер
  },
});
