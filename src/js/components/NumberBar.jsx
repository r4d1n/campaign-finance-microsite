'use strict';

let NumberBar = React.createClass({
  render () {
    return (
      <div className='big-num-bar'>
        <h3>Donald Has Raised: </h3>
        <hr/>
        <h1>$1,000,000</h1>
        <hr/>
      </div>
    );
  }
});

function init() {
  React.render(<NumberBar />, document.getElementById('lede-container'));
}

module.exports = { init: init }
