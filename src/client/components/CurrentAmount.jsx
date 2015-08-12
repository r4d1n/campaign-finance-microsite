'use strict';

let CurrentAmount = React.createClass({
  render() {
    let { activeCandidate } = this.props
    , raisedString = activeCandidate && activeCandidate.raisedString || '';

    let headerClass;
    if (activeCandidate.party === 'R') headerClass += ' gop'
    if (activeCandidate.party === 'D') headerClass += ' dem'

    return (
      <div className='big-num-bar'>
        <div className='amount'>
          <h1 className={headerClass}>{activeCandidate.familiarName}</h1>
            <h3> has raised:</h3>
          <hr/>
          <h1>{`$${raisedString}`}</h1>
          <hr/>
        </div>
      </div>
    );
  }
});

module.exports = CurrentAmount;
