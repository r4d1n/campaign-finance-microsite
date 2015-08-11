'use strict';

// let { updateSelectedCandidate } = require('../actions/Actions.jsx');

let YearSelect = React.createClass({

  // mixins: Reflux.connect(require('../stores/CandidateStore.jsx'), 'selected'),

  getInitialState () {
    return {currentYear : "2016"}
  },

  handleChange (e) {
    console.log(e.target.value)
    this.setState({currentYear : e.target.value})
    // let { candidates } = this.props;
    // let selected = _.find(candidates, item => item.id === e.target.value )
    // if (selected) {
    //   updateSelectedCandidate(selected);
    // }
  },

  render() {
    let { candidates, activeCandidate } = this.props;
    let years = [ "2000", "2004", "2008", "2012", "2016" ]
    let currentYear = years[years.length - 1]

    return (
      <div className='year-select-container'>
        <h3 className='year-select-label'>Choose Campaign Year</h3>
        <select className='year-select' value={this.state.currentYear} ref='yearSelect' onChange={this.handleChange}>
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
      </div>
    );
  }
});

module.exports = YearSelect;
