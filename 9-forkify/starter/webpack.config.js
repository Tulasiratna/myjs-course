const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
    //filename: './dist/js/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};
