'use strict';

let Record = require('../../../models/record.model');
let Timestamp = require('../../../models/timestamp.model');

let controller = {};

// functions for answering JSON requests

// get all projects within the relevant time frame
controller.allRecords = function(req, res, next) {
  Record
  .find()
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
  Timestamp
  .find()
  .sort({requestedAt : -1})
  .limit(1)
  .exec()
  .then((timestamp) => {
    return Record
    .find()
    .where('requestedAt')
    .equals(timestamp[0].requestedAt)
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({status:'error', message: err});
    })
  })
}
//
// function latestTimestamp () {
//   return new Timestamp
//   .find()
//   .sort({requestedAt : -1})
//   .limit(1)
//   .exec()
// })
// };

module.exports = controller;
