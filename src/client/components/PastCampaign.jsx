'use strict';

let formatDollarAmount = require('../utils/formatDollarAmount')

let React = require('react/addons');
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// child components
let PastChart = require('./PastChart.jsx')
, Picture = require('./Picture.jsx')
, YearSelect = require('./YearSelect.jsx')
, PastNames = require('./PastNames.jsx')

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
          <header><h1 className="primary-header">Past Winners</h1></header>
          <Picture displayCandidate={candidates[0]} />
          <PastChart {...this.props} candidates={candidates} />
          <YearSelect activeYear={activeYear} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = PastCampaign;
