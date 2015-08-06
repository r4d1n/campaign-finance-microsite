'use strict';

// external deps
let ajax = require('superagent');
let util = require('../util');

// sub components
let Chart = require('./Chart.jsx')
, NameSelect = require('./NameSelect.jsx')
, Amount = require('./Amount.jsx')
, Share = require('./Share.jsx')


let Card = React.createClass({
  getInitialState() {
    return {
      candidates: []
    };
  },
  componentDidMount() {
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
      let candidates = body;
      candidates.forEach((element) => {
        element.firstName = util.commonName(element);
        element.raisedString = util.formatDollarAmount(element.officialRaised)
      })
      this.setState({
        candidates: candidates,
      })
      console.log('state', this.state)
    })
  },
  render: function () {
    return (
      <div>
        <section>
          <div className='big-num-bar'>
            <NameSelect candidates={this.state.candidates}/>
            <Amount raised={this.state.selected} />
          </div>
        </section>
        <Chart data={this.state.candidates} />
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
