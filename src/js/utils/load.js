'use strict';

let ajax = require('superagent');

function load (url) {
  return new Promise((resolve, reject) => {
    ajax.get(url)
    .end(function(err, res){
      if (res.ok) {
        resolve(res.body);
      } else if (err) {
        reject(err)
        console.error(err);
      }
    }.bind(this));
  })
}

module.exports = load;
