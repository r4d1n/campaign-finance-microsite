'use strict';

let NumberBar = require('./NumberBar.jsx')
, InfoFigure = require('./InfoFigure.jsx')
, Chart = require('./Chart.jsx')

let Card = React.createClass({
  render () {
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
  React.render(<Card />, document.getElementById('card-container'));
}

module.exports = { init: init }
