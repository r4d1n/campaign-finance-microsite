'use strict';


function initCurrent (data) {
  require('./barChart')(data);
}

module.exports = {
  initCurrent: initCurrent,
  highlight: require('./highlight')
}
