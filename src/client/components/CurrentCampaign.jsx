'use strict';

let React = require('react/addons');
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// child components
let CurrentChart = require('./CurrentChart.jsx')
, CurrentAmount = require('./CurrentAmount.jsx')
, Picture = require('./Picture.jsx')


let CurrentCampaign = React.createClass({

  render: function () {
    let { candidates, activeCandidate } = this.props

    return (
      <ReactCSSTransitionGroup transitionName="campaign" transitionAppear={true}>
        <div>
          <header><h1 className="primary-header">Who Will Win The Race?</h1></header>
          <Picture {...this.props} />
          <CurrentChart {...this.props} activeCandidate={activeCandidate} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = CurrentCampaign;
