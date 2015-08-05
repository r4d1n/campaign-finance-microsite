'use strict';

let ajax = require('superagent');
let viz = require('../viz')

let Chart = React.createClass({
  componentDidMount: function() {
  
  },
  render: function () {
    return (
      <section>
        <div id='chart-container'></div>
      </section>
    );
  }
});

module.exports = Chart;
