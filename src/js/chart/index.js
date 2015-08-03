'use strict';

let ajax = require('superagent');
let d3 = require('d3');

let render = require('./render');

let data;

function fetchData () {
  return new Promise((resolve, reject) => {
    ajax
    .get('/api/records')
    .end(function(err, res){
      if (err) reject(err);
      resolve(res);
    });
  })
}

function init () {
  fetchData.then((data) => {
    return render(data);
  })
}

module.exports = {
  init: init;
}
