var  gulp = require('gulp'),
shell = require('gulp-shell'),
config = require('./config');

gulp.task('server', function () {
  var nodemon = require('gulp-nodemon');
  nodemon({
    "script": "app.js",
    "ext": "js jsx json es6",
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

// gulp.task('seed', shell.task(['babel-node seed.js']));
gulp.task('drop-local', shell.task(["mongo " + config.DEV_DB + " --eval 'db.dropDatabase()'"]));

// CLI for webpack dev
// http://webpack.github.io/docs/webpack-dev-server.html#cli
// gulp.task('dev-webpack', shell.task([['webpack-dev-server --quiet --port ' + config.server.webpackServerPort]]));
gulp.task('dev-webpack', shell.task([['webpack-dev-server --color --port ' + 8080]]));

gulp.task('webpack', shell.task(['webpack']));

gulp.task('test', shell.task(['node_modules/.bin/mocha -u tdd -R spec --compilers js:mocha-traceur']));

gulp.task('default', ['server', 'dev-webpack']);
