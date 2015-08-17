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

  shouldShowArrows() {
    if (/past/.exec(window.location.pathname)) {
      return false;
    } else {
      return true;
    }
  },

  render() {
    let { displayCandidate } = this.props;

    let name = displayCandidate.name;
    // current cands have official and familiar name
    if (displayCandidate.familiarName) name = displayCandidate.familiarName;

    let imageDir = /past/.exec(window.location.pathname) ? 'past' : 'current'; // remember initial load w/ no path
    let image = `/images/${imageDir}/${name.toLowerCase().split(' ')[1]}.jpg`;

    let arrows = [ <div onClick={this.beforeCandidate} className='left-icon'><i className='fa fa-angle-left fa-5x'></i></div>,
    <div onClick={this.afterCandidate} className='right-icon'><i className='fa fa-angle-right fa-5x'></i></div> ];

      let leftArrow, rightArrow;

      if (this.shouldShowArrows()) {
        leftArrow = arrows[0];
        rightArrow = arrows[1];
      }

      return (
        <ReactCSSTransitionGroup transitionName="picture-div" transitionAppear={true}>
          <div id='picture-div'>
            <div key={name.split(' ')[0] + '_div'} className='picture-name-container'>
              {leftArrow}
              <h1 key={name.split(' ')[0] + '_0'} className='picture-name-header'>{name.split(' ')[0]}</h1>
              <h1 key={name.split(' ')[0] + '_1'}className='picture-name-header'>{name.split(' ')[1]}</h1>
              {rightArrow}
            </div>
            <img key={name.split(' ')[0] + '_img'} src={image} />
          </div>
        </ReactCSSTransitionGroup>
      );
    }
  });

  module.exports = Picture;
