require('babel/register');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var fetch = require('./lib/fetch');
var env = require('node-env-file');
env('.env');

var app = express();

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'));


// var port = process.env.PORT || 3000;
// var server = app.listen(port, function () {
//
//   var host = server.address().address
//   var port = server.address().port
//
//   console.log('App listening at http://%s:%s', host, port)
//
// })
fetch.getData();
module.exports = app;
