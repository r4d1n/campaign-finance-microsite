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
          // just hardcoding one for now
          return /TRUMP/.exec(el.name)
        })[0] // filter returns an array
      })()
      let data = oneCandidate;
      let firstName = util.firstName(data.name);
      let raisedString = util.formatDollarAmount(data.officialRaised)
        this.setState({
          data: data,
          firstName: firstName,
          raisedString: raisedString
        })
        console.log(this.state.data)
      } else if (err) {
        console.error(err);
      }
    }.bind(this));
  },
  render: function () {
    return (
      <div>
        <NumberBar
          firstName={this.state.firstName}
          raisedString={this.state.raisedString} />
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
