'use strict';

let formatDollarAmount = require('../utils/formatDollarAmount')

let React = require('react/addons');
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// child components
let PastNames = require('./PastNames.jsx')
, PastChart = require('./PastChart.jsx')
, YearSelect = require('./YearSelect.jsx')

let PastCampaign = React.createClass({

  activateCampaignYear() {
    let { past, activeYear } = this.props;
    return past[activeYear];
  },

  componentDidMount() {
    this.activateCampaignYear();
  },

  render () {
    let {activeYear} = this.props;
    let candidates = this.activateCampaignYear();
    let difference = formatDollarAmount(candidates[0].receipts - candidates[1].receipts)

    return (
      <ReactCSSTransitionGroup transitionName="campaign" transitionAppear={true}>
        <div>
          <PastNames {...this.props} difference={difference} candidates={candidates} />
          <PastChart {...this.props} candidates={candidates} />
          <YearSelect activeYear={activeYear} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = PastCampaign;
