'use strict';

let draw = require('./draw');

function init (data, party) {
  let candidates = data.filter((el) => {
    return el.party === party;
  })
  draw(candidates);
}

module.exports = {
  init: init,
  highlight: require('./highlight')
}
