'use strict';

let { Route, DefaultRoute, NotFoundRoute } = Router;
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
  <Route path="/" handler={App}>
    <DefaultRoute handler={CurrentCampaign} />
    <NotFoundRoute handler={CurrentCampaign} />
    <Route name="current" path="current" handler={CurrentCampaign} />
    {  /* <Route name="prior" path="prior/:year" handler={PriorCampaign} /> */}
  </Route>
);

load('api/records/latest')
.then((body) => {
  let candidates = formatCandidates(body.current);
  console.log(body)
  Router.run(routes, function (Handler) {
    React.render(<Handler candidates={candidates} />, document.body);
  });
})
