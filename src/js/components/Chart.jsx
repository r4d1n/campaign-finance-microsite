'use strict';

let viz = require('../viz');

let Chart = React.createClass({

  componentDidMount() {
    viz.init(this.props.candidates);
    // viz.highlight(this.props.activeCandidate);
  },

  componentDidUpdate() {
    console.log('in Chart', this.props.activeCandidate)
    viz.highlight(this.props.activeCandidate);
    // viz.update(jaredblah)
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
