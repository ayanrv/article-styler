/* eslint-disable prettier/prettier */
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  output: {
    // 👉 собираем прямо в корневую папку docs
    path: path.resolve(__dirname, '../docs'),
    filename: 'static/scripts/[name].[contenthash].js',

    // 👉 ОЧЕНЬ важно: относительные пути, чтобы работало на /article-styler/
    publicPath: './',
  },
};

/* eslint-enable prettier/prettier */