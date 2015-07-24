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
  Timestamp
  .find()
  .sort({_id: 1})
  .limit(1)
  .exec((err, timestamp) => {
    if (err) {
      throw err;
    }
    Record
    .where('requestedAt')
    .equals(timestamp[0].requestedAt)
    .exec((err, result) => {
      if (err) {
        res.status(500).json({status:'error', message: err});
      }
      res.json(result);
    })
  })
};

module.exports = controller;
