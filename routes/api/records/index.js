'use strict';

var express = require('express');
var controller = require('./records.controller');

var router = express.Router();

// all routes prefixed with /api/records/

/* GET JSON */
router.get('/', controller.getAllRecords); // needs query string
router.get('/timestamp/:time', controller.getMostRecent);

module.exports = router;
