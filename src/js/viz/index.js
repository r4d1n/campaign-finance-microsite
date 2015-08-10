'use strict';


function init (data) {
  require('./barChart')(data);
}

module.exports = {
  init: init,
  highlight: require('./highlight')
}
