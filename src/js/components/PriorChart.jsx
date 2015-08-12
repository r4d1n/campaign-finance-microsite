'use strict';

let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let CandidateStore = require('../stores/CandidateStore.jsx');


let viz = require('../viz');

let PriorChart = React.createClass({

  renderChart() {
    let { prior, activeYear } = this.props;
    let candidates = prior[activeYear];
    console.log(prior, activeYear, candidates)
    viz.initPrior(candidates);
  },

  componentDidMount() {
    this.renderChart();
  },

  componentDidUpdate() {
    // this.forceUpdate()
    let target = document.getElementById('bar-chart-target');
    let svg = document.getElementById('prior-chart-svg');
    target.removeChild(svg);
    this.renderChart();
  },

  render: function () {
    return (
      <div id='bar-chart-target'></div>
    );
  }
});

module.exports = PriorChart;
