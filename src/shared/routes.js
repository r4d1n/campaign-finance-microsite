'use strict';

let React = require('react')

// react router and top level components
let { Route, DefaultRoute, NotFoundRoute } = require('react-router');
let App = require('../client/components/App.jsx')
, CurrentCampaign = require('../client/components/CurrentCampaign.jsx')
, PriorCampaign = require('../client/components/PriorCampaign.jsx')


/* export react routes for BOTH client and server use */

module.exports = [
  <Route path="/" handler={App}>
    <DefaultRoute handler={CurrentCampaign} />
    <NotFoundRoute handler={CurrentCampaign} />
    <Route name="current" path="current" handler={CurrentCampaign} />
    <Route name="prior" path="prior/:year" handler={PriorCampaign} />
  </Route>
]
