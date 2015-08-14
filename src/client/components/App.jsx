'use strict';

// flux
let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let Store = require('../stores/CandidateStore.jsx')

// router
let { Route, RouteHandler, Link } = Router;

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

  clickTab(e) {
    if (e.target.children[0] && e.target.children[0].tagName === 'A') {
      e.target.children[0].click();
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

    // highlight nav tab
    let currentTabClass = 'nav-tab';
    let pastTabClass = 'nav-tab';
    if (/past/.exec(window.location.pathname)) {
      pastTabClass += ' active'
    } else {
      currentTabClass += ' active'
    }

    return (
      <div>
        <nav className='nav-main' onClick={this.clickTab}>
          <ul role='tablist'>
            <li id='left-tab' className={currentTabClass} onClick={this.clickTab}>
              <Link to="current" className='nav-link' role='tab'>Upcoming</Link>
            </li>
            <li id='right-tab' className={pastTabClass} onClick={this.clickTab}>
              <Link to="past" params={{year:activeYear}} className='nav-link' role='tab'>Past</Link>
            </li>
          </ul>
        </nav>
        <RouteHandler {...this.props} activeCandidate={activeCandidate} activeYear={activeYear} />
        <Share />
      </div>
    );
  }
});

module.exports = App;
