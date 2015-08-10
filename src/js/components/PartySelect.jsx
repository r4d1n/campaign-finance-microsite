'use strict';

let PartySelect = React.createClass({
  render() {

    return (
      <div className='party-select'>
        <h3 className='party-instructions'>
        Choose Party
        </h3>
        <form>
          <fieldset>
            <input type='radio' name='gop' />
            <label htmlFor='gop'>Republicans</label>
          </fieldset>
          <fieldset>
            <input type='radio' name='dem' />
            <label htmlFor='dem'>Democrats</label>
          </fieldset>
        </form>
      </div>
    );
  }
});

module.exports = PartySelect;
