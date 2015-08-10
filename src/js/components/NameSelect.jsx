'use strict';

let { updateSelectedCandidate } = require('../actions/CardActions.jsx');

let NameSelect = React.createClass({

  mixins: Reflux.connect(require('../stores/CandidateStore.jsx'), 'selected'),

  handleChange (e) {
    let { candidates } = this.props;
    let selected = _.find(candidates, item => item.id === e.target.value )
    if (selected) {
      updateSelectedCandidate(selected);
    }
  },

  render() {
    let { candidates, activeCandidate } = this.props;
    let selectClass;
    if (activeCandidate.party === 'R') selectClass = 'gop'
    if (activeCandidate.party === 'D') selectClass = 'dem'
    return (
      <h3>
        <select value={activeCandidate.id} className={selectClass} ref='nameSelect' onChange={this.handleChange}>
          {candidates.map(cand => <option key={cand.fecId} value={cand.id}>{cand.firstName}</option>)}
        </select>
        Has Raised:
      </h3>
    );
  }
});

module.exports = NameSelect;
