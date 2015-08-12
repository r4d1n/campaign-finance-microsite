'use strict';

let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let CandidateStore = require('../stores/CandidateStore.jsx');


let viz = require('../viz');

let PastChart = React.createClass({

  renderChart() {
    let { past, activeYear } = this.props;
    let candidates = past[activeYear];
    viz.initPast(candidates);
  },

  componentDidMount() {
    this.renderChart();
  },

  componentDidUpdate() {
    // this.forceUpdate()
    let target = document.getElementById('bar-chart-target');
    let svg = document.getElementById('past-chart-svg');
    target.removeChild(svg);
    this.renderChart();
  },

  render: function () {
    return (
      <div id='bar-chart-target'></div>
    );
  }
});

module.exports = PastChart;
