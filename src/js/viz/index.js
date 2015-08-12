'use strict';


function initCurrent (data) {
  require('./currentCampaignChart')(data);
}

function initPrior (data) {
  require('./priorCampaignChart')(data);
}

module.exports = {
  initCurrent: initCurrent,
  initPrior: initPrior,
  highlight: require('./highlight')
}
