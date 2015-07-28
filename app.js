'use strict';

require('babel/register');

var config = require('./config');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var app = express();


if (process.env.NODE_ENV==='development' || process.env.NODE_ENV==='test') {
  var env = require('node-env-file');
  env('.env');
}

// mongodb connection
var mongoose = require('mongoose');

if (process.env.NODE_ENV==='development') {
  // var sunlightRequest = require('./lib/sunlightRequest');
  // sunlightRequest.init();
  mongoose.connect('mongodb://localhost/' + config.DEV_DB);
}

if (process.env.NODE_ENV==='test') {
  mongoose.connect('mongodb://localhost/' + config.TEST_DB);
}

if (process.env.NODE_ENV==='production') {
  mongoose.connect(process.env.MONGOLAB_URI);
}

// register handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: 'views/partials/',
  extname: '.hbs',
  helpers: {
    repeat: require('handlebars-helper-repeat')
  }
}));
app.set('view engine', '.hbs');

// routes
app.use('/', require('./routes/index')); // render views
app.use('/api/records', require('./routes/api/records'));

app.use(express.static(__dirname + '/public'));

app.locals.development = !!(process.env.NODE_ENV==='development');

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

})

module.exports = app;
