'use strict';

let React = require('react')

// child components
let Amount = require('./Amount.jsx')
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
