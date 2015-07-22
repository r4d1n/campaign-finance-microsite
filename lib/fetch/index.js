let request = require('request');
let _ = require('lodash');
let env = require('node-env-file');
env('.env');

let candidates = require('../../candidates');

let Record = require('../records/record.model');

import links from './links';
import { getAndSave } from './get';

// console.log('links', links);

function init () {
  
}

function asyncExecAll (fn, arr) {
  let timestamp = Date.now;
  Timestamp.save({
    time: timestamp
  })
  return new Promise(arr.forEach(fn));
}

// asyncExecAll(requestAndSaveResource, resources)

module.exports = {
  // requestAndSaveResource: requestAndSaveResource,
  // asyncExecAll: asyncExecAll
};
