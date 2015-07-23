'use strict';

let Timestamp = require('../../models/timestamp.model');

function saveTimestamp () {
  return new Promise((resolve, reject) => {
    let current = new Date();
    console.log(current);
    let timestamp = new Timestamp({
      requestedAt: current
    });
    timestamp.save((err, timestamp) => {
      if (err) {
        reject('error saving timestamp', err)
      }
      console.log('saved timestamp', timestamp);
    })
      resolve(current);
  })
}

module.exports = saveTimestamp;
