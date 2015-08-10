'use strict';

let { updateSelectedParty } = require('../actions/Actions.jsx');

let PartySelect = React.createClass({

  handleChange (e) {
    // toggle between D and R
    let selected = e.target.name;
    console.log('selected', selected)
    if (selected) {
      // updateSelectedParty(selected);
    }
  },

  render() {
    return (
      <div className='party-select'>
        <h3 className='party-instructions'>
          Choose Party
        </h3>
        <form onChange={this.handleChange}>
          <fieldset>
            <input type='radio' name='R' />
            <label htmlFor='R'>Republicans</label>
          </fieldset>
          <fieldset>
            <input type='radio' name='D' />
            <label htmlFor='D'>Democrats</label>
          </fieldset>
        </form>
      </div>
    );
  }
});

module.exports = PartySelect;
