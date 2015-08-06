'use strict';

let NameSelect = React.createClass({
  onChange (e) {
    console.log(e.target.value);
  },
  render() {
    console.log(this.props);
    let { candidates } = this.props;
    return (
          <h3>
            <select onChange={this.onChange}>
            {candidates.map(cand => <option key={cand.fecId} value={cand.firstName}>{cand.firstName}</option>)}
            </select>
            Has Raised:
          </h3>
    );
  }
});

module.exports = NameSelect;
