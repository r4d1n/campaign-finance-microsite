'use strict';

let Record = require('../models/record.model.js');
let Timestamp = require('../models/timestamp.model.js');

let assert = require('chai').assert;

let app  = require('../app.js');
let port = 3333;


suite('first suite', function() {
  let server;

  setup(function(done) {
    // start the app each time, return server object to close
    server = app.listen(port, function (err, result) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  teardown(function() {
    // remove any added items from the local db
    // close the express server connection
    server.close();
  });

  test('', function(done) {
    console.log('a test')
    assert.fail();

    // done()
  }); // end test

});
