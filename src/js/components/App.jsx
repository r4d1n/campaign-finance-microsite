'use strict';

// external deps
let ajax = require('superagent');

// flux
let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let Store = require('../stores/CandidateStore.jsx')

// router
let { Route, DefaultRoute, RouteHandler, Link } = Router;


// child components
let BarChart = require('./BarChart.jsx')
, YearSelect = require('./YearSelect.jsx')
, Amount = require('./Amount.jsx')
, Share = require('./Share.jsx')
, CurrentCampaign = require('./CurrentCampaign.jsx')



let App = React.createClass({

  mixins: [Reflux.connect(require('../stores/CandidateStore.jsx'), 'activeCandidate')],


  componentDidMount() {
    let { candidates } = this.props
    updateSelectedCandidate(candidates[0]);
  },

  render: function () {
    let { candidates } = this.props
    , { activeCandidate } = this.state
    return (
      <div>
        <RouteHandler {...this.props} activeCandidate={activeCandidate} />
        <YearSelect />
        <Share />
      </div>
    );
  }
});

module.exports = App;
