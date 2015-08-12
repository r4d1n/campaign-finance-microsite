'use strict';

let formatDollarAmount = require('../utils/formatDollarAmount')

// child components
let NameSelect = require('./NameSelect.jsx')
, PastAmount = require('./PastAmount.jsx')
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
      <div>
        <YearSelect activeYear={activeYear} />
        <PastAmount {...this.props} difference={difference} candidates={candidates} />
        <PastChart {...this.props} candidates={candidates} />

      </div>
    );
  }

});

module.exports = PastCampaign;
