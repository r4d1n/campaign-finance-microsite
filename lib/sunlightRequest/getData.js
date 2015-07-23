'use strict';

let request = require('request');
let _ = require('lodash');

// make a single request and return a promise that resolves w/ data object to save

function getData(uri, timestamp) {
  return new Promise((resolve, reject) => {
    request(uri, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let data = JSON.parse(body)['results'][0]; // we don't want the entire json
        data.timestamp = timestamp
        resolve(data);
      } else {
        reject('Error getting data', err)
      }
    })
  })
}

module.exports = getData;
