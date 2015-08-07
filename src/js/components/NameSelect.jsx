'use strict';
let { updateSelectedCandidate } = require('../actions/CardActions.jsx');

let NameSelect = React.createClass({

  mixins: Reflux.connect(require('../stores/CardStore.jsx'), 'selected'),

  handleChange (e) {
    // e.preventDefault();
    let { candidates } = this.props;
    let candidate = _.find(candidates, item => item.id === e.target.value )
    console.log(candidate);
    if (candidate) {
      updateSelectedCandidate(candidate);
    }
  },

  render() {
    let { candidates } = this.props;
    return (
      <h3>
        <select onChange={this.handleChange}>
        {candidates.map(cand => <option key={cand.fecId} value={cand.id}>{cand.firstName}</option>)}
        </select>
        Has Raised:
      </h3>
    );
  }
});

module.exports = NameSelect;
