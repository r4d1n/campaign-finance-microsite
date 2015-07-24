'use strict';

process.env.NODE_ENV = 'test';

let request = require('request');

let Record = require('../models/record.model.js');
let Timestamp = require('../models/timestamp.model.js');

let chai = require('chai');
let sinon = require('sinon');

let chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

let assert = chai.assert;

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
let fakeRes = require('./res');

suite('Sunlight API Request Functions', function() {
  let server;
  let timestamp;

  setup(function(done) {
    sinon
    .stub(request, 'get')
    .yields(null,fakeRes);

    done();
  });

  teardown(function(done) {
    // remove any added items from the local db
    Timestamp.find({requestedAt: timestamp}).remove().exec();
    Record.find({requestedAt: timestamp}).remove().exec();

    // clean up global timestamp and restore stubbed request method
    timestamp = undefined;
    request.get.restore();

    done();
  });

  test('create a new timestamp', function(done) {
    saveTimestamp()
    .then((time) => {
      timestamp = time; // set global for clean up
      assert.ok(time);
    })
    .catch((err) => {
      done(err);
    })
    done();
  }); // end timestamp test

  test('make a data request', function(done) {
    let spy = sinon.spy();
    timestamp = Date.now();
    // todo: use chai-as-promised here, stub ajax
    getData('/a/test/url', timestamp)
    .then((data) => {
      spy(data);
      assert.ok(request.get.called);
      assert.ok(spy.calledWith(data));
      assert.equal(data.timestamp, timestamp);
    })
    .catch((err) => {
      done(err);
    });
    done();
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
    })
    .catch((err) => {
      done(err);
    });
    done();
  }); // end save test
});
