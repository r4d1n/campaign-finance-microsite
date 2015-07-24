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
  let timestamp;
  let timesArr = [];
  let data;
  let secondTimestamp;
  let secondData;

  setup(function(done) {

    timestamp = Date.now();
    saveTimestamp(timestamp)
    .then(() => {
      data = sample.results[0];
      data.timestamp = timestamp;
      return saveRecord(data);
    })
    .then(() => {
      secondData = sample.results[0];
      secondTimestamp = Date.now();
      secondData.timestamp = secondTimestamp;
      return saveTimestamp(secondTimestamp);
    })
    .then(() => {
      return saveRecord(secondData);
    })
    .then(() => {
      timesArr.push(timestamp, secondTimestamp);
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
    timesArr.forEach((timestamp) => {
      Timestamp.find({requestedAt: timestamp}).remove().exec();
      Record.find({requestedAt: timestamp}).remove().exec();
    })
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
    .end(function(err, res){
      if (err) return done(err);
      assert(res.body.length > 0, "body length should be greater than zero");
      done();
    });
  })
});
