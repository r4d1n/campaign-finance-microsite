'use strict';

// child components
let CurrentChart = require('./CurrentChart.jsx')
, NameSelect = require('./NameSelect.jsx')
, CurrentAmount = require('./CurrentAmount.jsx')

let CurrentCampaign = React.createClass({

  componentDidMount() {

  },

  componentWillReceiveProps(nextProps) {

  },

  render: function () {
    let { candidates, activeCandidate } = this.props
    return (
      <div>
        <CurrentAmount activeCandidate={activeCandidate} />
        <CurrentChart {...this.props} activeCandidate={activeCandidate} />
        <div className='tap-to-change'>
          <h3>Tap Bars to Select Candidates</h3>
        </div>
      </div>
    );
  }

});

module.exports = CurrentCampaign;
