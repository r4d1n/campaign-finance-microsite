'use strict';

// child components
let BarChart = require('./BarChart.jsx')
, NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')

let CurrentCampaign = React.createClass({

  render: function () {
    let { candidates, activeCandidate } = this.props
    return (
      <div>
        <section>
          <div className='big-num-bar'>
            <Amount activeCandidate={activeCandidate} />
          </div>
        </section>
        <BarChart {...this.props} activeCandidate={activeCandidate} />
      </div>
    );
  }
  
});

module.exports = CurrentCampaign;
