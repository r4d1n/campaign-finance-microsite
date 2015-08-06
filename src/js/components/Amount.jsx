'use strict';

let Amount = React.createClass({
  render() {
    let { candidates } = this.props;
    return (
      <div>
        <hr/>
        <h1>$</h1>
        <hr/>
      </div>
    );
  }
});

module.exports = Amount;
