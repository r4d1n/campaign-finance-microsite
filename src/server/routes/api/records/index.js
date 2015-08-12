'use strict';

var express = require('express');
var controller = require('./records.controller');

var router = express.Router();

// all routes prefixed with /api/records/

/* GET JSON */
router.get('/', controller.allRecords); // needs query string
router.get('/latest', controller.latestRecords);
// router.get('/leaders', controller.leaders)

module.exports = router;
