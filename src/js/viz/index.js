'use strict';

let ajax = require('superagent');
let d3 = require('d3');

let render = require('./render');

let data;

function init (data) {
  console.log(data)
}

module.exports = {
  init: init
}
