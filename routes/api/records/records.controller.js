'use strict';

let Record = require('../../../models/record.model');
let Timestamp = require('../../../models/timestamp.model');

let candidates = require('../../../lib/candidates')

let controller = {};

let priorYears = require('../../../lib/priorYears');

// functions for answering JSON requests

// get all projects within the relevant time frame
controller.allRecords = function(req, res, next) {
  let opts = {};
  if (req.query.name) {
    opts.name = new RegExp(req.query.name, "i");
  }
  Record
  .find(opts)
  .sort({ requestedAt : 1 })
  .exec(function (err,doc) {
    if (err) {
      res.status(500).json({status:'error', message: err});
    } else {
      res.json(doc);
    }
  });
}

controller.latestRecords = function(req, res, next) {
  let limit = 5; // limits number of candidates, not timestamps
  if (req.query.limit) {
    limit = req.query.limit;
  }
  Timestamp
  .find()
  .sort({requestedAt : -1})
  .limit(1)
  .exec()
  .then(function (timestamp) {
    return Record
    .find()
    .where('requestedAt')
    .equals(timestamp[0].requestedAt)
    .sort({ officialRaised : -1 })
    .limit(limit)
    .exec()
    .then(function (result) {
      let response = {
        current: result,
        prior: priorYears
      }
      res.json(response);
    })
    .catch(function (err) {
      res.status(500).json({status:'error', message: err});
    })
  })
}

module.exports = controller;
