'use strict';

let React = require('react/addons');
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

let { updateSelectedCandidate } = require('../actions/Actions.jsx');
let CandidateStore = require('../stores/CandidateStore.jsx');


let Picture = React.createClass({

  beforeCandidate(e) {
    // update active candidate by tapping on a bar in the d3 chart
    let { candidates, activeCandidate } = this.props;
    let i = candidates.indexOf(_.find(candidates, item => new RegExp(item.id).exec(activeCandidate.id)))
    let m = i - 1;
    if (m < 0) m = candidates.length - 1;
    updateSelectedCandidate(candidates[m]);
  },

  afterCandidate(e) {
    // update active candidate by tapping on a bar in the d3 chart
    let { candidates, activeCandidate } = this.props;
    let i = candidates.indexOf(_.find(candidates, item => new RegExp(item.id).exec(activeCandidate.id)))
    let m = i + 1;
    if (m >= candidates.length) m = 0;
    updateSelectedCandidate(candidates[m]);
  },

  render() {
    let { activeCandidate } = this.props
    , raisedString = activeCandidate && activeCandidate.raisedString || '';

    let firstName = activeCandidate.familiarName.split(' ')[0]
    let lastName = activeCandidate.familiarName.split(' ')[1]

    return (
      <ReactCSSTransitionGroup transitionName="picture-div" transitionAppear={true}>
        <div id='picture-div'>
          <div key={activeCandidate.id + '_div'} className='picture-name-container'>
            <div onClick={this.beforeCandidate} className='left-icon'><i className='fa fa-angle-left fa-5x'></i></div>
            <h1 key={activeCandidate.id + '_0'} className='picture-name-header'>{activeCandidate.familiarName.split(' ')[0]}</h1>
            <h1 key={activeCandidate.id + '_1'}className='picture-name-header'>{activeCandidate.familiarName.split(' ')[1]}</h1>
            <div onClick={this.afterCandidate} className='right-icon'><i className='fa fa-angle-right fa-5x'></i></div>
          </div>
          <img key={activeCandidate.id + '_img'} src={activeCandidate.image} />
        </div>
      </ReactCSSTransitionGroup>
    );
  }
});

module.exports = Picture;
