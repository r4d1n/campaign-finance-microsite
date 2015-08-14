'use strict';

let React = require('react/addons');
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

// child components
let CurrentChart = require('./CurrentChart.jsx')
, CurrentAmount = require('./CurrentAmount.jsx')


let CurrentCampaign = React.createClass({

  render: function () {
    let { candidates, activeCandidate } = this.props
    return (
      <ReactCSSTransitionGroup transitionName="campaign" transitionAppear={true}>
        <div>
          <CurrentAmount activeCandidate={activeCandidate} />
          <div className='tap-to-change'>
            <h3>Tap Bars to Reveal Leading Fundraisers</h3>
          </div>
          <CurrentChart {...this.props} activeCandidate={activeCandidate} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }

});

module.exports = CurrentCampaign;
