'use strict';

var express = require('express');
var controller = require('./project.controller');

var router = express.Router();

// all routes prefixed with /api/projects/

/* GET JSON */
router.get('/', controller.getActiveProjects); // needs query string
router.get('/id/:id', controller.getById);
router.get('/client/:client', controller.getByClient);

/* CRUD */
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.destroy);

module.exports = router;
