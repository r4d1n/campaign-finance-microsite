'use strict';

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

    return (
      <div>
        <PastAmount {...this.props} candidates={candidates} />
        <PastChart {...this.props} candidates={candidates} />
        <YearSelect activeYear={activeYear} />

      </div>
    );
  }

});

module.exports = PastCampaign;
