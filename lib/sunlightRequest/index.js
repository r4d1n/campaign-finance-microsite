'use strict';

let _ = require('lodash');

let links = require('./links'); // an array of uris to request
let getData = require('./getData'); // function getData(uri, timestamp)
let saveRecord = require('./saveRecord'); ; // function saveRecord(data)
let saveTimestamp = require('./saveTimestamp'); ; // returns Promise w/ timestamp


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
  saveTimestamp()
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