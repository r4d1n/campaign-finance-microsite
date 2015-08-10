'use strict';

// external deps
let ajax = require('superagent');

// flux
let { updateSelectedCandidate } = require('../actions/CardActions.jsx');
let Store = require('../stores/CandidateStore.jsx')

// child components
let BarChart = require('./BarChart.jsx')
, NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')
, Share = require('./Share.jsx')
, Comparison = require('./Comparison.jsx')



let App = React.createClass({

  mixins: [Reflux.connect(require('../stores/CandidateStore.jsx'), 'activeCandidate')],


  componentDidMount() {
    let { candidates } = this.props
    updateSelectedCandidate(candidates[0]);
  },

  render: function () {
    let { candidates } = this.props
    , { activeCandidate } = this.state
    return (
      <div>
        <section>
          <div className='big-num-bar'>
            <Amount activeCandidate={activeCandidate} />
          </div>
        </section>
        <Comparison {...this.props} activeCandidate={activeCandidate} />
        <BarChart {...this.props} activeCandidate={activeCandidate} />
        <Share />
      </div>
    );
  }
});

module.exports = App;
