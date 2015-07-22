'use strict';

let Record = require('./record.model');

let controller = {};

// functions for answering JSON requests

// get all projects within the relevant time frame
controller.getMostRecentRecords = function(req, res, next) {
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

// create a new record
controller.create = function(req, res) {
  // var data = req.body;
  Record({

  })
  .save((err, result) => {
    if (err) {
      res.status(500).json({status:'error', message: err});
    }
    res.status(201)
    // .location(req.hostname + '/api/projects/id/' + result._id)
    .json({status:'success', result: result});
  });
}

controller.destroy = function (req, res) {
  var id = req.params.id;
  Project.findByIdAndRemove(
    id,
    function(err, result) {
      if (err) {
        res.status(500).json({status:'error', message: err});
      } else if (!result) {
        // console.log('no result')
        res.status(404).json({status:'error', message: err});
      } else {
        // console.log('in successful delete: ' + result)
        res.status(204).json({status:'success', id: result._id});
      }
    }
  );
}

module.exports = controller;
