 path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
})
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  // devtool: 'cheap-module-source-map',
  entry: './client/index',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
           {
             presets:['es2015','react']
           }
      }
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: __dirname + '/build'
  },
  plugins: [HtmlWebpackPluginConfig],
};