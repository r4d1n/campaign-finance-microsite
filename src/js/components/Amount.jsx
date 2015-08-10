'use strict';

let Amount = React.createClass({

  render() {
    let { activeCandidate } = this.props
    , raisedString = activeCandidate && activeCandidate.raisedString || ''
    , familiarName = activeCandidate && activeCandidate.familiarName || '';

    let headerClass;
    if (activeCandidate && activeCandidate.party === 'R') headerClass = 'gop'
    if (activeCandidate && activeCandidate.party === 'D') headerClass = 'dem'

    return (
      <div>
        <div>
          <h3 className={headerClass}>{familiarName}</h3>
          <br />
          <h3> has raised:</h3>
        </div>
        <hr/>
        <h1>{`$${raisedString}`}</h1>
        <hr/>
      </div>
    );
  }
});

module.exports = Amount;
