'use strict';

let viz = require('../viz');

let Chart = React.createClass({

  componentDidMount() {

    viz.init(this.props.candidates);
  },

  componentDidUpdate() {
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
