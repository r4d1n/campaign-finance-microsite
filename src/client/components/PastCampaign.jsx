'use strict';

// child components
let NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')
, PastChart = require('./PastChart.jsx')
, YearSelect = require('./YearSelect.jsx')

let PastCampaign = React.createClass({

  componentWillUpdate() {
  },

  render () {
    console.log(this.props)
    let {activeYear} = this.props;

    return (
      <div>
        <div className='big-num-bar'>

        </div>
        <PastChart {...this.props} />
        <YearSelect activeYear={activeYear} />

      </div>
    );
  }

});

module.exports = PastCampaign;
