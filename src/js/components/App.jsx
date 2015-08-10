'use strict';

// external deps
let ajax = require('superagent');

// flux
let { updateSelectedCandidate, updateSelectedParty } = require('../actions/Actions.jsx');

// sub components
let Chart = require('./Chart.jsx')
, PartySelect = require('./PartySelect.jsx')
, Amount = require('./Amount.jsx')
, Share = require('./Share.jsx')

let App = React.createClass({

  mixins: [
    Reflux.connect(require('../stores/CandidateStore.jsx'), 'activeCandidate'),
    Reflux.connect(require('../stores/PartyStore.jsx'), 'activeParty')
  ],

  componentDidMount() {
    let { candidates } = this.props
    let { activeParty } = this.state
    console.log('app', activeParty)
    // updateSelectedParty(activeParty);
    let active = candidates.filter((el) => {
      return el.party === activeParty;
    })
    console.log('in app, active', active)
    updateSelectedCandidate(active[0]);
    // updateSelectedCandidate(candidates[0]);
  },

  componentDidUpdate() {
    let { activeParty } = this.state
    console.log('app did update', activeParty)
    let active = this.props.candidates.filter((el) => {
      return el.party === activeParty;
    })
    console.log(active)
    // updateSelectedCandidate(active[0]);
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
        <Chart {...this.props} {...this.state} />
        <PartySelect {...this.props} {...this.state} />
        <Share />
      </div>
    );
  }
});

module.exports = App;
