'use strict';

let Share = React.createClass({
  render: function () {
    return (
        <div className='share-container'>
          <ul className='share-icons'>
            <li><h3 className='share-text'>Share:</h3></li>
            <li>
              <a className='twitter-link' href={`https://twitter.com/share?
                  url=${window.encodeURI(window.location.href)}
                  &via=r4d1n`}
                  target="_blank">
                  <i className='fa fa-twitter fa-2x'></i>
                </a>
              </li>
              <li>
                <a className='facebook-link' href={`https://www.facebook.com/sharer/sharer.php?
                    &u=${window.encodeURI(window.location.href)}`}
                    target="_blank" title="Share on Facebook">
                    <i className='fa fa-facebook fa-2x'></i>
                  </a>
                </li>
              </ul>
            </div>
        );
      }
    });

    module.exports = Share;
