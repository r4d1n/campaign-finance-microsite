'use strict';

// external deps
let ajax = require('superagent');

// sub components
let NumberBar = require('./NumberBar.jsx')
, InfoFigure = require('./InfoFigure.jsx')
, Chart = require('./Chart.jsx')



let Card = React.createClass({
  componentDidMount: function() {
    ajax.get(this.props.url)
    .end(function(err, res){
      if (res.ok) {
        console.log(res)
        this.setState({ data: res })
      } else if (err) {
        console.error(err);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <NumberBar />
        <Chart />
        <InfoFigure />
      </div>
    );
  }
});

function init() {
  React.render(<Card url="api/records/latest" />,
document.getElementById('card-container'));
}

module.exports = { init: init }
