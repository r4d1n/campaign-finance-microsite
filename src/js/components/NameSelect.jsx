'use strict';

let { updateSelectedCandidate } = require('../actions/CardActions.jsx');

let NameSelect = React.createClass({

  mixins: Reflux.connect(require('../stores/CardStore.jsx'), 'selected'),

  handleChange (e) {
    let { candidates } = this.props;
    let selected = _.find(candidates, item => item.id === e.target.value )
    if (selected) {
      updateSelectedCandidate(selected);
    }
  },

  render() {
    let { candidates, activeCandidate } = this.props;
    return (
      <h3>
        <select value={activeCandidate.id} ref='nameSelect' onChange={this.handleChange}>
          {candidates.map(cand => <option key={cand.fecId} value={cand.id}>{cand.firstName}</option>)}
        </select>
        Has Raised:
      </h3>
    );
  }
});

module.exports = NameSelect;
