'use strict';

let Record = require('../../../models/record.model');
let Timestamp = require('../../../models/timestamp.model');

let controller = {};

// functions for answering JSON requests

// get all projects within the relevant time frame
controller.getAllRecords = function(req, res, next) {
  Record
  .find()
  .sort({ requestedAt : 1 })
  .exec((err,doc) => {
    if (err) {
      res.status(500).json({status:'error', message: err});
    }
    res.json(doc);
  })
};

controller.getMostRecent = function(req, res, next) {

  // Project
  // .where('start')
  // .lte(req.query.end)
  // .where('end')
  // .gte(req.query.start)
  // .sort({end : 1}) // closest deadlines first
  // .exec((err,doc) => {
  //   if (err) {
  //     res.status(500).json({status:'error', message: err});
  //   }
  //   res.json(doc);
  // })
};

module.exports = controller;
