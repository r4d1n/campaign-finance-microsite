var  gulp = require('gulp'),
  shell = require('gulp-shell');

gulp.task('server', function () {
  var nodemon = require('gulp-nodemon');
  nodemon({
  "script": "app.js",
  "ext": "js json es6",
  "env": { "NODE_ENV": "development" },
  "ignore": [
    "node_modules/**",
    "public/**",
    "src/**",
    "dist/**",
    "views/**",
    "webpack.config.js",
    "gulpfile.js",
    "gulpfile.es6",
    "package.json"
  ]
});
});

// CLI for webpack dev
// http://webpack.github.io/docs/webpack-dev-server.html#cli
// gulp.task('dev-webpack', shell.task([['webpack-dev-server --quiet --port ' + config.server.webpackServerPort]]));
gulp.task('dev-webpack', shell.task([['webpack-dev-server --color --port ' + 3000]]));

gulp.task('webpack', shell.task(['webpack']));


// gulp.task('default', ['server']);
gulp.task('default', ['server', 'dev-webpack']);
