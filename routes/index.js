'use strict';

let _ = require('lodash');
let express = require('express');
let router = express.Router();

// Routes for rendering pages go here

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
