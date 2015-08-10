'use strict';

let Amount = React.createClass({
  render() {
    let { activeCandidate } = this.props
      , raisedString = activeCandidate && activeCandidate.raisedString || '';

      let headerClass;
      if (activeCandidate.party === 'R') headerClass = 'gop'
      if (activeCandidate.party === 'D') headerClass = 'dem'

    return (
      <div>
        <h3><span className={headerClass}>{activeCandidate.familiarName}</span><span> has raised:</span></h3>
        <hr/>
        <h1>{`$${raisedString}`}</h1>
        <hr/>
      </div>
    );
  }
});

module.exports = Amount;
