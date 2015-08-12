'use strict';

let { updateSelectedCandidate } = require('../actions/Actions.jsx');


let Comparison = React.createClass({

  render: function () {
    let { activeCandidate } = this.props;

    let partyClass; // = 'compare-link';
    if (activeCandidate.party === 'R') partyClass += ' gop'
    if (activeCandidate.party === 'D') partyClass += ' dem'

    return (
      <section>
          <div id='comparison-container'>
            <h3>Which Could Buy</h3>
            <h1>{this.props.activeCandidate.tablets}</h1>
            <h3><a className='compare-link' href='http://amzn.com/B00GQDBS7O'>iPad Minis</a></h3>
          </div>
      </section>
    );
  }

});

module.exports = Comparison;
