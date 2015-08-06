'use strict';

let NumberBar = React.createClass({
  render: function() {
    return (
      <section>
        <div className='big-num-bar'>
          <h3>
            <select>
              <option>{this.props.firstName}</option>
            </select>
            Has Raised: </h3>
          <hr/>
          <h1>${this.props.raisedString}</h1>
          <hr/>
        </div>
      </section>
    );
  }
});

module.exports = NumberBar;
