'use strict';

let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let CandidateStore = require('../stores/CandidateStore.jsx');


let viz = require('../viz');

let CurrentChart = React.createClass({

  selectCandidate(e) {
    // update active candidate by tapping on a bar in the d3 chart
    let { candidates } = this.props;
    console.log(e.target)
    let selected = _.find(candidates, item => new RegExp(item.id).exec(e.target.id) )
    if (selected) {
      updateSelectedCandidate(selected);
    }
  },

  componentDidMount() {
    viz.initCurrent(this.props.candidates);
    viz.highlight(this.props.activeCandidate);
  },

  componentDidUpdate() {
    viz.highlight(this.props.activeCandidate);
  },

  componentWillReceiveProps(nextProps) {

  },

  render: function () {
    return (
      <div onClick={this.selectCandidate} onTouch={this.selectCandidate} id='bar-chart-target'></div>
    );
  }
});

module.exports = CurrentChart;
