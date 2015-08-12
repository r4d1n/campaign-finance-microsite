'use strict';


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


// Routing
let routes = require('../shared/routes')


// load data from server and render
load('api/records/latest')
.then((body) => {
  console.log(body)
  let candidates = formatCandidates(body.current);
  let past = body.past;
  console.log(past)
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler candidates={candidates} past={past}/>, document.body);
  });
    // document.getElementById('app-container'));
})
