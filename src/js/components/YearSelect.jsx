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

  render() {
    let { candidates, activeCandidate, activeYear } = this.props;
    let years = [2016, 2012, 2008, 2004, 2000]

    return (
      <div className='year-select-container'>
        <h3 className='year-select-label'>Choose Campaign Year</h3>
        <select className='year-select' value={activeYear} ref='yearSelect' onChange={this.handleChange}>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    );
  }
});

module.exports = YearSelect;
