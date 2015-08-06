'use strict';

let Record = require('../../../models/record.model');
let Timestamp = require('../../../models/timestamp.model');

let controller = {};

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
  .limit(1)
  .exec()
  .then((timestamp) => {
    return Record
    .find()
    .where('requestedAt')
    .equals(timestamp[0].requestedAt)
    .sort({ officialRaised : -1 })
    .limit(limit)
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({status:'error', message: err});
    })
  })
}

// controller.leaders = function(req, res, next) {
//   let limit = 5; // limits number of candidates, not timestamps
//   if (req.query.limit) {
//     limit = req.query.limit;
//   }
//   let sortObj;
//   if (req.query.sortby) {
//     sortObj = {};
//     sortObj[req.query.sortby] = 1;
//   }
//
//   Timestamp
//   .find()
//   .sort({requestedAt : -1})
//   .limit(1)
//   .exec()
//   .then((timestamp) => {
//     Record
//     .find()
//     .where('requestedAt')
//     .equals(timestamp[0].requestedAt)
//     .sort({ officialRaised : -1 })
//     .limit(limit)
//     .exec()
//     .then((result) => {
//       let leaders = {}
//       // this can be refactored...
//       return new Promise((resolve, reject) => {
//         result.forEach((doc) => {
//           if (!leaders[doc.name]) leaders[doc.name] = [];
//           Record.find()
//           .where('name')
//           .equals(key)
//           .exec()
//           .then((result) => {
//             console.log(result);
//             leaders[key].push(result);
//           })
//         })
//         resolve(leaders);
//       })
//     })
//     .then((leaders) => {
//       console.log(leaders)
//       res.json(leaders);
//     })
//     .catch((err) => {
//       res.status(500).json({status:'error', message: err});
//     })
//   })
// }

module.exports = controller;
