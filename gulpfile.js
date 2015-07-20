var  gulp = require('gulp'),
  shell = require('gulp-shell');

gulp.task('server', function () {
  shell.task(['http-server'])
});

// CLI for webpack dev
// http://webpack.github.io/docs/webpack-dev-server.html#cli
// gulp.task('dev-webpack', shell.task([['webpack-dev-server --quiet --port ' + config.server.webpackServerPort]]));
gulp.task('dev-webpack', shell.task([['webpack-dev-server --color --port ' + 3000]]));

gulp.task('webpack', shell.task(['webpack']));


// gulp.task('default', ['server']);
gulp.task('default', ['server','dev-webpack']);
