const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
    //filename: './dist/js/bundle.js'
  },

  devServer: {
    contentBase: './dist'
  },

  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],

  module: {
    rules: [
        {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
              loader: 'babel-loader'
           }
        }
    ]
  }
};
