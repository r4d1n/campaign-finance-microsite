'use strict';

let ajax = require('superagent');
let viz = require('../viz');

let Chart = React.createClass({
  getInitialState: function() {
    return { data: this.props.data };
  },
  render: function () {
    viz.init(this.props.data);
    return (
      <section>
        <div id='chart-container'></div>
      </section>
    );
  }
});

module.exports = Chart;
