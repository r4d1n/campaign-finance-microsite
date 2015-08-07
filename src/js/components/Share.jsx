'use strict';

let Share = React.createClass({
  render: function () {
    return (
      <section>
        <div className='share-container'>
          <div>
            <div className='share-text'>
              <h3>Share</h3>
            </div>
            <div className='share-icons'>
              <a className='twitter-link' href={`https://twitter.com/share?
                  url=${window.encodeURI(window.location.href)}
                  &via=r4d1n`}
                  target="_blank">
                  <i className='fa fa-twitter fa-3x'></i>
                </a>
                <a className='facebook-link' href={`https://www.facebook.com/sharer/sharer.php?
                  &u=${window.encodeURI(window.location.href)}`}
                  target="_blank" title="Share on Facebook">
                  <i className='fa fa-facebook fa-3x'></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      );
    }
  });

  module.exports = Share;
