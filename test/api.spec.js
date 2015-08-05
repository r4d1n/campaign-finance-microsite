'use strict';

process.env.NODE_ENV = 'test'

let assert = require('chai').assert;
let ajax = require('supertest');

let Record = require('../models/record.model.js');
let Timestamp = require('../models/timestamp.model.js');

let links = require('../lib/sunlightRequest/links');
let sunlightRequest = require('../lib/sunlightRequest');
let saveRecord = require('../lib/sunlightRequest/saveRecord');
let saveTimestamp = require('../lib/sunlightRequest/saveTimestamp');

let sample = require('./sample');

let app  = require('../app.js');
let port = 3333;

suite('Record Retrieval API', function() {
  let server;
  let timestamp1;
  let timestamp2;
  let data1;
  let data2;
  let timesArr = [];

  setup(function(done) {

    timestamp1 = Date.now();
    saveTimestamp(timestamp1)
    .then((timestamp1) => {
      data1 = sample.results[0];
      data1.timestamp = timestamp1;
      return saveRecord(data1);
    })
    .then(() => {
      timestamp2 = Date.now();
      return saveTimestamp(timestamp2);
    })
    .then((timestamp2) => {
      data2 = sample.results[0];
      data2.timestamp = timestamp2;
      return saveRecord(data2);
    })
    .then(() => {
      timesArr.push(timestamp1, timestamp2);
      // start the app each time, return server object to close
      server = app.listen(port, function (err, result) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    })
  });

  teardown(function() {
    // remove any added items from the local db
    Timestamp.find({requestedAt: timestamp1}).remove().exec();
    Record.find({requestedAt: timestamp1}).remove().exec();
    Timestamp.find({requestedAt: timestamp2}).remove().exec();
    Record.find({requestedAt: timestamp2}).remove().exec();

    timesArr = [];
    // close the express server connection
    server.close();
  });

  test('get all records', function(done) {
    ajax(app)
    .get('/api/records')
    .expect('Content-Type', /json/)
    .expect(200,done)
  });

  test('get most recent records', function(done) {
    ajax(app)
    .get('/api/records/latest')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      assert(res.body.length > 0, "body length should be greater than zero");
      assert.equal(+new Date(res.body[0].requestedAt), +new Date(timestamp2));
      done();
    });
  })
});
