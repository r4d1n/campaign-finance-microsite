'use strict';

let _ = require('lodash');

let Record = require('../../models/record.model');
let Timestamp = require('../../models/timestamp.model');

let links = require('./links'); // an array of uris to request
let getData = require('./getData'); // function getData(uri, timestamp)
let saveRecord = require('./saveRecord'); ; // function saveRecord(data)


function saveTimeStamp () {
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

function executeAll (time) {
  console.log('execute all time', time)
  let resources = links;
  (function check() {
    if (resources.length === 0) {
      // done
      console.log('done')
    } else {
      let uri = resources.shift();
      getData(uri, time)
      .then((data) => {
        return saveRecord(data);
      })
      .then(check)
      .catch((err) => {
        console.log('Error executing requests', err)
      })
    }
  })();
}

function init() {
  saveTimeStamp()
  .then((time) => {
    executeAll(time);
  })
  .catch((err) => {
    console.error(err);
  })
}

// asyncExecAll(requestAndSaveResource, resources)

module.exports = {
  init: init
};
