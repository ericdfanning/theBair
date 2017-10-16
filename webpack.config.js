var path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  // devtool: 'cheap-module-source-map',
  entry: './client/index.js',
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
      },
      {
        test: /\.(jpeg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      }
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
  HtmlWebpackPluginConfig,
  new HardSourceWebpackPlugin({
    cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
    recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
    configHash: require('node-object-hash')({sort: false}).hash,
  })],
};