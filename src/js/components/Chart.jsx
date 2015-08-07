'use strict';

let { updateSelectedCandidate } = require('../actions/CardActions.jsx');

let viz = require('../viz');

let Chart = React.createClass({

  handleClick(e) {
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
        <div onClick={this.handleClick} id='chart-container'></div>
      </section>
    );
  }
});

module.exports = Chart;
