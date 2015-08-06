'use strict';

// external deps
let ajax = require('superagent');
let util = require('../util');

// sub components
let NumberBar = require('./NumberBar.jsx')
, InfoFigure = require('./InfoFigure.jsx')
, Chart = require('./Chart.jsx')
, Share = require('./Share.jsx')


let Card = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    function getLeaders (url) {
      return new Promise((resolve, reject) => {
        ajax.get(url)
        .end(function(err, res){
          if (res.ok) {
            resolve(res.body);
          } else if (err) {
            reject(err)
            console.error(err);
          }
        }.bind(this));
      })
    }

    getLeaders(this.props.url)
    .then((body) => {
      let data = body;
      console.log('card', data)
      let one = data[0]; // only the leader for now
      let firstName = util.firstName(one.name);
      let raisedString = util.formatDollarAmount(one.officialRaised)
      this.setState({
        data: data,
        firstName: firstName,
        raisedString: raisedString
      })
      console.log(this.state.data)
    })
  },
  render: function () {
    return (
      <div>
        <NumberBar
          firstName={this.state.firstName}
          raisedString={this.state.raisedString} />
        <Chart data={this.state.data} />
        <Share />
      </div>
    );
  }
});

function init() {
  React.render(<Card url="api/records/latest" />,
document.getElementById('card-container'));
}

module.exports = { init: init }
