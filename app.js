'use strict';

// require('babel/register');

var config = require('./config');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');


// react, router, and routes for server side Render
var React = require('react');
var Router = require('react-router');
var routes = require('./src/shared/routes');

var app = express();


if (process.env.NODE_ENV==='development' || process.env.NODE_ENV==='test') {
  var env = require('node-env-file');
  env('.env');
}

// mongodb connection
var mongoose = require('mongoose');

if (process.env.NODE_ENV==='development') {
  mongoose.connect('mongodb://localhost/' + config.DEV_DB);
  console.log(process.env.NODE_ENV)
  // require('./lib/sunlightRequest').init()
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
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

// routes
app.use('/api/records', require('./routes/api/records'));
// app.use('*', require('./routes/index')); // render views

app.get('*', function (req, res) {
  // React Routing


  // res.render('index');
  Router.run(routes, req.path, function (Handler, state) {
    var element = React.createElement(Handler);
    var html = React.renderToString(element);
    res.render('main', { content: html });
  });

});


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
