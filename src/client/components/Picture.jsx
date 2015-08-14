'use strict';

let Picture = React.createClass({

  componentDidUpdate() {
    let { activeCandidate } = this.props;
    // console.log(activeCandidate)
    // document.getElementById("picture-div").style.backgroundImage = `url(${activeCandidate.image})`;
  },

  render() {
    let { activeCandidate } = this.props
    , raisedString = activeCandidate && activeCandidate.raisedString || '';

    let firstName = activeCandidate.familiarName.split(' ')[0]
    let lastName = activeCandidate.familiarName.split(' ')[1]

    return (
      <div id='picture-div'>
        <div className='picture-amount-container'>
          <h1 className='picture-amount-header'>{activeCandidate.familiarName.split(' ')[0]}</h1>
          <h1 className='picture-amount-header'>{activeCandidate.familiarName.split(' ')[1]}</h1>
          </div>
          <img src={activeCandidate.image} />
        </div>
      );
    }
  });

  module.exports = Picture;
