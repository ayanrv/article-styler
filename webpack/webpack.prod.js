/* eslint-disable prettier/prettier */ 
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'static/scripts/[name].[contenthash].js',

    // Важно! Правильный publicPath для GitHub Pages
    publicPath: '/article-styler/',
  },
};

/* eslint-enable prettier/prettier */
