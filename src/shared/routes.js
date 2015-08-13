'use strict';

let React = require('react')

// react router and top level components
let { Route, DefaultRoute, NotFoundRoute } = require('react-router');
let App = require('../client/components/App.jsx')
, CurrentCampaign = require('../client/components/CurrentCampaign.jsx')
, PastCampaign = require('../client/components/PastCampaign.jsx')


/* export react routes for BOTH client and server use */

module.exports = [
  <Route path="/" handler={App}>
    <DefaultRoute handler={CurrentCampaign} />
    <NotFoundRoute handler={CurrentCampaign} />
    <Route name="current" path="current" handler={CurrentCampaign} />
    <Route name="past" path="past/:year" handler={PastCampaign} ignoreScrollBehavior />
  </Route>
]
