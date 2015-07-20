var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    index: './src/js/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer!sass!' },
      { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' },
      { test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      Logger: 'js-logger',
      React: 'react',
      // Reflux: 'reflux',
      // Router: 'react-router',
    })
  ]
};
