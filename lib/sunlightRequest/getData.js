'use strict';

let request = require('request');
let _ = require('lodash');

let fs = require('fs')

// make a single request and return a promise that resolves w/ data object to save

function getData(uri, timestamp) {
  return new Promise((resolve, reject) => {
    console.log("making request: ", uri);
    request
    .get(uri, function(err, response) {
      if (!err && response.statusCode == 200) {
        let data = JSON.parse(response.body)['results'][0]; // we don't want the entire json
        data.timestamp = timestamp;
        resolve(data);
      } else {
        console.log(err, 'err')
        reject(err);
      }
    })
  })
}

module.exports = getData;
