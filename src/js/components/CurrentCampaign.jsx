'use strict';

// child components
let BarChart = require('./BarChart.jsx')
, NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')

let CurrentCampaign = React.createClass({

  componentDidMount() {

  },

  componentWillReceiveProps(nextProps) {

  },

  render: function () {
    let { candidates, activeCandidate } = this.props
    return (
      <div>
        <section>
          <div className='big-num-bar'>
            <Amount activeCandidate={activeCandidate} />
          </div>
        </section>
        <section>
          <BarChart {...this.props} activeCandidate={activeCandidate} />
          <div className='tap-to-change'>
            <h3>Tap Bars to Select Candidates</h3>
          </div>
        </section>
      </div>
    );
  }

});

module.exports = CurrentCampaign;
