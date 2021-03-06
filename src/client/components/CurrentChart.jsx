'use strict';

let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let CandidateStore = require('../stores/CandidateStore.jsx');


let viz = require('../viz');

let CurrentChart = React.createClass({

  selectCandidate(e) {
    // update active candidate by tapping on a bar in the d3 chart
    let { candidates } = this.props;
    // get id from parent 'g' element
    let targetId = e.target.parentNode.id;
    let selected = _.find(candidates, item => new RegExp(item.id).exec(targetId) )
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
      <div onClick={this.selectCandidate} id='bar-chart-target'></div>
    );
  }
});

module.exports = CurrentChart;
