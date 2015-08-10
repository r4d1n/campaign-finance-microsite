'use strict';

let { updateSelectedCandidate } = require('../actions/CardActions.jsx');


let Comparison = React.createClass({

  componentDidMount() {
    // this.setState({tablets: 0})
  },

  componentDidUpdate() {
    // let { candidates } = this.props
    // updateSelectedCandidate(candidates[0]);
    console.log(this.props)

  },

  render: function () {
    return (
      <section>
        <div id='comparison-container'>
          <h3>The Cost of (Roughly)</h3>
          <h1>{this.props.activeCandidate.tablets}</h1>
          <h3>iPad Minis</h3>
        </div>
      </section>
    );
  }
});

module.exports = Comparison;
