'use strict';

// external deps
let ajax = require('superagent');

// flux
let { updateSelectedCandidate } = require('../actions/CardActions.jsx');
let Store = require('../stores/CardStore.jsx')

// sub components
let Chart = require('./Chart.jsx')
, PartySelect = require('./PartySelect.jsx')
, Amount = require('./Amount.jsx')
, Share = require('./Share.jsx')


let App = React.createClass({

  mixins: [Reflux.connect(require('../stores/CardStore.jsx'), 'activeCandidate')],


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
        <Chart {...this.props} activeCandidate={activeCandidate} />
        <PartySelect />
        <Share />
      </div>
    );
  }
});

module.exports = App;
