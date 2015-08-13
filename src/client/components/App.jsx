'use strict';

// external deps
let ajax = require('superagent');

// flux
let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let Store = require('../stores/CandidateStore.jsx')

// router
let { Route, DefaultRoute, RouteHandler, Link } = Router;

// child components
let Share = require('./Share.jsx')

let App = React.createClass({

  mixins: [
    Reflux.connect(require('../stores/CandidateStore.jsx'), 'activeCandidate'),
    Reflux.connect(require('../stores/YearStore.jsx'), 'activeYear'),
    Router.Navigation
  ],

  highlightTab() {
    let currentTabClass = 'nav-tab';
    let pastTabClass = 'nav-tab';
    if (/past/.exec(window.location.pathname)) {
      currentTabClass -= ' active'
      pastTabClass += ' active'
    } else {
      pastTabClass -= ' active'
      currentTabClass += ' active'
    }
  },

  componentDidMount() {
    let { candidates } = this.props
    updateSelectedCandidate(candidates[0]);
  },

  componentWillUpdate(nextProps, nextState) {
    if (this.state.activeYear != nextState.activeYear) {
      let href = this.makeHref('past', {year: nextState.activeYear});
      this.replaceWith(href);
    }
  },

  render: function () {
    let { candidates } = this.props
    , { activeCandidate, activeYear } = this.state

    let currentTabClass = 'nav-tab';
    let pastTabClass = 'nav-tab';
    if (/past/.exec(window.location.pathname)) {
      pastTabClass += ' active'
    } else {
      currentTabClass += ' active'
    }

    return (
      <div>
        <nav className='nav-main'>
          <ul role='tablist'>
            <li id='left-tab' className={currentTabClass}><Link to="current" className='nav-link' role='tab'>Upcoming</Link></li>
            <li id='right-tab' className={pastTabClass}><Link to="past" params={{year:activeYear}} className='nav-link' role='tab'>Past</Link></li>
          </ul>
        </nav>
        <RouteHandler {...this.props} activeCandidate={activeCandidate} activeYear={activeYear} />
        <Share />
      </div>
    );
  }
});

module.exports = App;
