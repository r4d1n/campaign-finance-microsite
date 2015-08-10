'use strict';

let { updateSelectedCandidate } = require('../actions/CardActions.jsx');

let viz = require('../viz');

let PieChart = React.createClass({



  render: function () {
    return (
      <section>
        <div id='pie-chart-container'></div>
      </section>
    );
  }
});

module.exports = PieChart;
