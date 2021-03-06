'use strict';


if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') === -1) {
  let Promise = require('es6-promise').Promise;
}

// react router and top level components
let { Route, DefaultRoute, NotFoundRoute } = Router;
let App = require('./components/App.jsx')
, CurrentCampaign = require('./components/CurrentCampaign.jsx')
, PastCampaign = require('./components/PastCampaign.jsx')

// scss
require('./styles/main.scss');


// client side js utils
let load = require('./utils/load')
let formatCandidates = require('./utils/formatCandidates')
let formatDollarAmount = require('./utils/formatDollarAmount')
let formatMillionString = require('./utils/formatMillionString');


// Routing
let routes = require('../client/routes')


// load data from server and render
load('api/records/latest')
.then((body) => {
  let candidates = formatCandidates(body.current);
  let past = body.past;
  // format past candidates TODO MOVE TO SERVER
  if (candidates && past) {

    for (let year in past) {
      past[year].sort((a,b) => {
        return b.receipts - a.receipts;
      })
      for (let i = 0; i < past[year].length; i++) {
        past[year][i].raisedString = formatDollarAmount(past[year][i].receipts);
        past[year][i].million = formatMillionString(past[year][i].raisedString);
        past[year][i].initials = past[year][i].name.split(' ').map((word) => {
          return word.slice(0,1)
        }).join('')
      }
    }
    // console.log(candidates, past)
    Router.run(routes, Router.HistoryLocation, function (Handler) {
      React.render(<Handler candidates={candidates} past={past}/>, document.body);
    });
  }
})
.catch((err) => {
  console.log(err);
})
