'use strict';

let PastNames = React.createClass({

  render() {
    let { activeYear, candidates, difference } = this.props

    let winnerClass = candidates[0].party === 'R' ? 'gop' : 'dem';
    let loserClass = candidates[1].party === 'R' ? 'lost gop' : 'lost dem';

    return (
      <div className='big-num-bar'>
        <div className='amount'>
          <hr/>
          <h1 className={winnerClass}>{candidates[0].name}</h1>
          <h3 className='outraised'>outraised</h3>
          <h3 className={loserClass}>{candidates[1].name}</h3>
          <hr/>
          <h3 className='past-year'>{`In ${activeYear}`}</h3>
        </div>
      </div>
    );
  }
});

module.exports = PastNames;
