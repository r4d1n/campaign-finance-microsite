'use strict';

let ajax = require('superagent');
let viz = require('../viz')

let Chart = React.createClass({
  componentDidMount: function() {
    ajax.get('/api/records?name=' + this.props.query)
    .end(function(err, res){
      if (res.ok) {
        console.log(res)
      } else if (err) {
        console.error(err);
      }
    }.bind(this));
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
