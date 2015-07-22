'use strict';

let _ = require('lodash');
let express = require('express');
let router = express.Router();

// Routes for rendering pages go here



// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/table', function(req, res, next) {
  res.render('table');
});

router.get('/icon', function(req, res, next) {
  res.render('icon');
});

router.get('/chart', function(req, res, next) {
  res.render('chart');
});

module.exports = router;
