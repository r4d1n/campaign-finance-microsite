'use strict';

// external deps
let ajax = require('superagent');

// flux
let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let Store = require('../stores/CandidateStore.jsx')

// router
let { Route, DefaultRoute, RouteHandler, Link } = Router;


// child components
let YearSelect = require('./YearSelect.jsx')
, Amount = require('./Amount.jsx')
, Share = require('./Share.jsx')
, CurrentCampaign = require('./CurrentCampaign.jsx')



let App = React.createClass({

  mixins: [
    Reflux.connect(require('../stores/CandidateStore.jsx'), 'activeCandidate'),
    Reflux.connect(require('../stores/YearStore.jsx'), 'activeYear'),
    Router.Navigation
  ],

  componentDidMount() {
    let { candidates } = this.props
    updateSelectedCandidate(candidates[0]);
  },

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activeYear != nextState.activeYear) {
      let href;
      if (nextState.activeYear == "2016") {
        href = '/current';
      } else {
        href = this.makeHref('prior', {year: nextState.activeYear});
      }
      this.transitionTo(href)
    }
  },

  render: function () {
    let { candidates } = this.props
    , { activeCandidate, activeYear } = this.state
    return (
      <div>
        <nav className='nav-main'>
          <ul>
            <li><Link to="current" className='nav-link'>Current</Link></li>
            <li><Link to="prior" params={{year:activeYear}} className='nav-link'>Past</Link></li>
            </ul>
          </nav>
          <RouteHandler {...this.props} activeCandidate={activeCandidate} activeYear={activeYear} />
          <Share />
        </div>
      );
    }
  });

  module.exports = App;
