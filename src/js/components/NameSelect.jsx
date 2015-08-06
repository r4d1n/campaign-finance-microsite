'use strict';

let NameSelect = React.createClass({
  change (e) {
    console.log(e.target.value);
  },
  render() {
    let { candidates } = this.props;
    return (
          <h3>
            <select onChange={this.change}>
            {candidates.map(cand => <option key={cand.fecId} value={cand.firstName}>{cand.firstName}</option>)}
            </select>
            Has Raised:
          </h3>
    );
  }
});

module.exports = NameSelect;
