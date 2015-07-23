let _ = require('lodash');

let Record = require('../../models/record.model');
let Timestamp = require('../../models/timestamp.model');


import links from './links'; // an array of uris to request
import getData from './getData'; // function getData(uri, timestamp)
import saveRecord from './saveRecord'; // function saveRecord(data)

// console.log(getAndSave)
// console.log('links', links);

function saveTimeStamp () {
  return new Promise((resolve, reject) => {
    let current = Date.now;
    console.log(current)
    let timestamp = new Timestamp;
    timestamp.save({
      request_time: current
    })
    resolve(current);
  })
}

function executeAll (time) {
  console.log('execute')
  let resources = links;

  (function check() {
    if (resources.length === 0) {
      // done
      console.log('done?')

    } else {
      console.log('do it!')
      let uri = resources.shift();
      getData(uri, time)
      .then(saveRecord)
      .then(check)
      .catch((err) => {
        console.log('Error executing requests', err)
      })
    }
  })();
}

function init() {
  console.log('init');
  saveTimeStamp()
  .then((time) => {
    console.log('time', time);
    executeAll(time);
  })
  .catch((err) => {
    console.log(err);
  })
}

// asyncExecAll(requestAndSaveResource, resources)

module.exports = {
  init: init
};
