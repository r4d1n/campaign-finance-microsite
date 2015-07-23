'use strict';

let Record = require('../models/record.model.js');
let Timestamp = require('../models/timestamp.model.js');

let assert = require('chai').assert;

let app  = require('../app.js');
let port = 3333;

let sunlightReq = require('../lib/sunlightReq');
let saveRecord = require('../lib/sunlightReq/saveRecord');
let getData = require('../lib/sunlightReq/getData');
let saveTimestamp = require('../lib/sunlightReq/saveTimestamp');
let links = require('../lib/sunlightReq/links');

suite('Sunlight API Request Functions', function() {
  let server;
  let timestamp;

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
    Timestamp.find({requestedAt: timestamp}).remove().exec();
    Record.find({requestedAt: timestamp}).remove().exec();

    // close the express server connection
    server.close();
  });

  test('create a new timestamp', function(done) {
    saveTimestamp()
    .then((time) => {
      assert.ok(time);
      timestamp = time; // set global for clean up
      done();
    })
  }); // end timestamp test

});
