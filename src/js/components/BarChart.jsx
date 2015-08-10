'use strict';

let { updateSelectedCandidate } = require('../actions/CardActions.jsx');

let viz = require('../viz');

let BarChart = React.createClass({

  handleClick(e) {
    // update active candidate by tapping on a bar in the d3 chart
    let { candidates } = this.props;
    let selected = _.find(candidates, item => item.id === e.target.dataset.id )
    if (selected) {
      updateSelectedCandidate(selected);
    }
  },

  componentDidMount() {
    viz.init(this.props.candidates);
  },

  componentDidUpdate() {
    viz.highlight(this.props.activeCandidate);
  },

  render: function () {
    return (
      <section>
        <div onClick={this.handleClick} id='bar-chart-container'></div>
        <div className='tap-to-change'>
          <h3>Tap Bars to Select Candidates</h3>
        </div>
      </section>
    );
  }
});

module.exports = BarChart;
