'use strict';

let { Route, DefaultRoute, NotFoundRoute } = Router;
let CurrentCampaign = require('./components/CurrentCampaign.jsx')
, PriorCampaign = require('./components/PriorCampaign.jsx')

// scss
require('../styles/main.scss');

// client side js modules
let App = require('./components/App.jsx')

let load = require('./utils/load')
let formatCandidates = require('./utils/formatCandidates')


// Routing
let routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={CurrentCampaign} />
    <NotFoundRoute handler={CurrentCampaign} />
    <Route name="current" path="current" handler={CurrentCampaign} />
    <Route name="prior" path="prior/:year" handler={PriorCampaign} />
  </Route>
);


// load data from server and render
load('api/records/latest')
.then((body) => {
  let candidates = formatCandidates(body.current);
  let prior = body.prior;
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler candidates={candidates} prior={prior}/>, document.body);
  });
})
