'use strict';

// external deps
let ajax = require('superagent');
let util = require('../util');

// sub components
let NumberBar = require('./NumberBar.jsx')
, InfoFigure = require('./InfoFigure.jsx')
, Chart = require('./Chart.jsx')


let Card = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    ajax.get(this.props.url)
    .end(function(err, res){
      if (res.ok) {
        console.log(res)
        let oneCandidate = (function () {
          return res.body.filter((el) => {
          // just doing donald for now
          return /TRUMP/.exec(el.name)
        })[0]
      })()
        console.log(oneCandidate)
        this.setState({
          data: oneCandidate,
          firstName: util.firstName(oneCandidate.name)
        })
        console.log(this.state.firstName)
      } else if (err) {
        console.error(err);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <NumberBar data={this.state.data} />
        <Chart data={this.state.data} />
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
