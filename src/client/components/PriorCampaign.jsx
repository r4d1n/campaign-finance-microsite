'use strict';

// child components
let NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')
, PriorChart = require('./PriorChart.jsx')

let PriorCampaign = React.createClass({

  componentWillUpdate() {
  },

  render () {
    return (
      <div>
        <div className='big-num-bar'>

        </div>
        <PriorChart {...this.props} />
        <YearSelect activeYear={activeYear} />

      </div>
    );
  }

});

module.exports = PriorCampaign;
