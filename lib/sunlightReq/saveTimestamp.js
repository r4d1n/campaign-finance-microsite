'use strict';

let Timestamp = require('../../models/timestamp.model');

function saveTimestamp () {
  return new Promise((resolve, reject) => {
    let current = new Date();
    let timestamp = new Timestamp({
      requestedAt: current
    });
    timestamp.save((err, timestamp) => {
      if (err) {
        reject('error saving timestamp', err)
      }
    })
      resolve(current);
  })
}

module.exports = saveTimestamp;
