'use strict';

let PastAmount = React.createClass({

  render() {
    let { activeYear, candidates } = this.props
    

    let headerClass;

    return (
      <div className='big-num-bar'>
        <div className='amount'>
          <h2>{`In ${activeYear}`}</h2>
          <hr/>
          <h3>
            <span className={headerClass}>{candidates[0].name}</span>
            <span>{` raised $${candidates[0].receipts}`}</span>
          </h3>
          <h3>
            <span className={headerClass}>{candidates[1].name}</span>
            <span>{` raised $${candidates[1].receipts}`}</span>
          </h3>
          <hr/>
        </div>
      </div>
    );
  }
});

module.exports = PastAmount;
