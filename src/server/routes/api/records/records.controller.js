'use strict';

let Record = require('../../../models/record.model');
let Timestamp = require('../../../models/timestamp.model');

let candidates = require('../../../candidates')

let controller = {};

let pastYears = require('../../../pastYears');

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
  .exec((err,doc) => {
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
  .limit(5)
  .exec()
  .then((timestamp) => {
    return (function getRecordByTimestamp(index) {
      return Record
      .find()
      .where('requestedAt')
      .equals(timestamp[index].requestedAt)
      .sort({ totalReceipts : -1 })
      .limit(limit)
      .exec()
      .then((result) => {
        if (Object.keys(result)[0]) {
          let response = {
            current: result,
            past: pastYears
          }
          res.json(response);
        } else {
          getRecordByTimestamp(index + 1);
        }
      })
      .catch((err) => {
        res.status(500).json({status:'error', message: err});
      })
    })(0)
  })
}

module.exports = controller;
