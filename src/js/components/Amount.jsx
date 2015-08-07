'use strict';

let Amount = React.createClass({
  render() {
    let { activeCandidate } = this.props
      , raisedString = activeCandidate && activeCandidate.raisedString || '';
    return (
      <div>
        <hr/>
        <h1>{`$${raisedString}`}</h1>
        <hr/>
      </div>
    );
  }
});

module.exports = Amount;
