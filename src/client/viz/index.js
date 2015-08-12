'use strict';


function initCurrent (data) {
  require('./currentCampaignChart')(data);
}

function initPast (data) {
  require('./pastCampaignChart')(data);
}

module.exports = {
  initCurrent: initCurrent,
  initPast: initPast,
  highlight: require('./highlight')
}
