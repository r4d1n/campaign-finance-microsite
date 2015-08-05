'use strict';

let NumberBar = React.createClass({
  render: function() {
    return (
      <section>
        <div className='big-num-bar'>
          <h3>Donald Has Raised: </h3>
          <hr/>
          <h1>$1,000,000</h1>
          <hr/>
        </div>
      </section>
    );
  }
});

module.exports = NumberBar;
