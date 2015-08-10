'use strict';

let { updateSelectedParty } = require('../actions/Actions.jsx');

let PartySelect = React.createClass({

  handleChange (e) {
    // toggle between D and R
    let selected = e.target.value;
    console.log('selected', selected)
    if (selected) {
      updateSelectedParty(selected);
    }
  },

  render() {
    return (
      <div className='party-select'>
        <h3 className='party-instructions'>
          Choose Party
        </h3>
        <select onChange={this.handleChange}>
          <option key='R' value='R'>Republicans</option>
          <option key='D' value='D'>Democrats</option>
          <option key='B' value='B'>Both</option>
        </select>
      </div>
    );
  }
});

module.exports = PartySelect;
