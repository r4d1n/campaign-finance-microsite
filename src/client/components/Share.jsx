'use strict';

let Share = React.createClass({
  render: function () {
    return (
      <div className='share-container'>
      <ul className='share-icons'>
      <li>
      <a className='twitter-link'
      href="https://twitter.com/intent/tweet?via=r4d1n&text=Who%20is%20winning%20the%20election%3F&url=http://www.economocracy.info"
      target="_blank">
      <i className='fa fa-twitter fa-3x'></i>
      </a>
      </li>
      <li>
      <a className='facebook-link'
      href="https://www.facebook.com/sharer/sharer.php?&u=http://www.economocracy.info"
      target="_blank" title="Share on Facebook">
      <i className='fa fa-facebook fa-3x'></i>
      </a>
      </li>
      </ul>
      </div>
    );
  }
});

module.exports = Share;
