'use strict';

process.env.NODE_ENV = 'test';

let Record = require('../models/record.model.js');
let Timestamp = require('../models/timestamp.model.js');

let assert = require('chai').assert;

let app  = require('../app.js');
let port = 3333;

let sunlightRequest = require('../lib/sunlightRequest');
let saveRecord = require('../lib/sunlightRequest/saveRecord');
let getData = require('../lib/sunlightRequest/getData');
let saveTimestamp = require('../lib/sunlightRequest/saveTimestamp');
let links = require('../lib/sunlightRequest/links');
let attrs = ['name', 'party', 'fecId', 'officialRaised',
'officialSpent', 'independentTotal', 'independentFor',
'independentAgainst', 'cashOnHand', 'cashDate', 'requestedAt'];

let sample = require('./sample');

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
      timestamp = time; // set global for clean up
      assert.ok(time);
      done();
    })
  }); // end timestamp test

  test('make a data request', function(done) {
    getData(links[0], timestamp)
    .then((data)=> {
      assert(typeof data === "object");
      assert.ok(data.name);
      assert.ok(data.timestamp);
      done();
    })
    .catch((err) => {
      done(err);
    });
  }); // end request test

  test('save a data object', function(done) {
    timestamp = Date.now();
    /* borrow 2 lines from actual getData fn to simulate its resolved value */
    let data = sample['results'][0];
    data.timestamp = timestamp;

    saveRecord(data)
    .then((record) => {
      attrs.forEach((element, index) => {
        assert.ok(record[element])
      });
      done();
    })
    .catch((err) => {
      done(err);
    });
  }); // end save test
});
