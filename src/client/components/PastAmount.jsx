'use strict';

let PastAmount = React.createClass({

  render() {
    let { activeYear, candidates, difference } = this.props

    let winnerClass = candidates[0].party === 'R' ? 'gop' : 'dem';
    let loserClass = candidates[1].party === 'R' ? 'lost gop' : 'lost dem';

    return (
      <div className='big-num-bar'>
        <div className='amount'>
          <h3 className='past-year'>{`In ${activeYear}`}</h3>
          <hr/>
          <h1 className={winnerClass}>{candidates[0].name}</h1>
          <h3>outraised</h3>
          <h3 className={loserClass}>{candidates[1].name}</h3>
          <hr/>
        </div>
      </div>
    );
  }
});

module.exports = PastAmount;
