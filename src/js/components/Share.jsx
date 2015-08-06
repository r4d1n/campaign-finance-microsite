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
              <i className='fa fa-twitter fa-3x'></i>
              <i className='fa fa-facebook fa-3x'></i>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Share;
