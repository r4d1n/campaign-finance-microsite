var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    index: './src/client/index.js'
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: 'public/dist/',
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!autoprefixer!sass!' },
      { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      React: 'react',
      Reflux: 'reflux',
      Router: 'react-router'
    })
  ]
};
