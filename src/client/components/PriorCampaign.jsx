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
        <section>
          <div className='big-num-bar'>

          </div>
        </section>
        <PriorChart {...this.props} />
      </div>
    );
  }

});

module.exports = PriorCampaign;
