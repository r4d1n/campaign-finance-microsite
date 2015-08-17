'use strict';

let { updateSelectedYear } = require('../actions/Actions.jsx');

let YearSelect = React.createClass({

  mixins: [Reflux.connect(require('../stores/YearStore.jsx'), 'activeYear')],

  handleChange (e) {
    let updateYear = e.target.value;
    if (updateYear) {
      updateSelectedYear(updateYear);
    }
  },

  activateClass () {

  },

  render() {
    let { candidates, activeCandidate, activeYear } = this.props;
    let years = [2012, 2008, 2004, 2000];
    let buttons = years.map((year) => {
      let buttonStatus = year == activeYear ? 'year active' : 'year'
      return (
        <button key={year} className={buttonStatus} onClick={this.handleChange} value={year}>{year}</button>
      )
    })

    return (
      <div className='year-select-container'>
        <ul className='year-select' ref='yearSelect'>
          {buttons}
        </ul>
      </div>
    );
  }
});

module.exports = YearSelect;
