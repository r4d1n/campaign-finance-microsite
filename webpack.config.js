var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

// to avoid weird node modules problems
var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});
// var node_modules = fs.readdirSync('node_modules').filter(function(x) { return x !== '.bin' });


module.exports = [{
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
},
{
  entry: './app.js',
  target: 'node',
  output: {
    path: path.join(__dirname),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    noParse: /\.md$/,
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "lib"),
          path.resolve(__dirname, "src")
        ],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "src/viz")
        ],
        loader: 'babel-loader'
      }
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
}
];
