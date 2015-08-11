'use strict';

let { Route, DefaultRoute, RouteHandler, Link } = Router;
let CurrentCampaign = require('./components/CurrentCampaign.jsx')

// scss
require('../styles/main.scss');


// client side js modules
let App = require('./components/App.jsx')

// let viz = require('./viz')

let load = require('./utils/load')
let formatCandidates = require('./utils/formatCandidates')


// Routing
let routes = (
  <Route handler={App}>
    <DefaultRoute handler={CurrentCampaign} />
  </Route>
);

load('api/records/latest')
.then((body) => {
  let candidates = formatCandidates(body);
  // React.render(<App candidates={candidates} />,
  // document.getElementById('card-container'));
  Router.run(routes, function (Handler) {
    React.render(<Handler candidates={candidates} />, document.body);
  });

})
