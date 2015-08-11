'use strict';

// child components
let BarChart = require('./BarChart.jsx')
, NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')

let PriorCampaign = React.createClass({

  render: function () {
    let { candidates, activeCandidate } = this.props
    return (
      <div>
        <section>
          <div className='big-num-bar'>

          </div>
        </section>

      </div>
    );
  }

});

module.exports = PriorCampaign;
