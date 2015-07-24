'use strict';

/* builds a list of URIs to retrieve data from */


if !(process.env.NODE_ENV === 'production') {
  let env = require('node-env-file');
  env('.env');
}


let apiBase = "http://realtime.influenceexplorer.com/api/candidates/";
let queryStringBase = "?format=json&page=1&page_size=10&fec_id=";
let keyString = '&apikey=' + process.env.SUNLIGHT_API_KEY;

let candidates = require('../candidates');

let links = (function (candidates) {
  let arr = []

  candidates['D'].forEach((element) => {
    let q = apiBase + queryStringBase + element.fec_id + keyString;
    arr.push(q);
  })

  candidates['R'].forEach((element) => {
    let q = apiBase + queryStringBase + element.fec_id + keyString;
    arr.push(q);
  })

  return arr;
})(candidates)

module.exports = links;
