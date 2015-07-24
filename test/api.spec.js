// 'use strict';
//
// process.env.NODE_ENV = 'test'
//
// let assert = require('chai').assert;
// let ajax = require('supertest');
//
// let Record = require('../models/record.model.js');
// let Timestamp = require('../models/timestamp.model.js');
//
// let links = require('../lib/sunlightRequest/links');
// let sunlightRequest = require('../lib/sunlightRequest');
//
// let app  = require('../app.js');
// let port = 3333;
//
// suite('Record Retrieval API', function() {
//   let server;
//
//   setup(function(done) {
//     // start the app each time, return server object to close
//     sunlightRequest.init();
//     server = app.listen(port, function (err, result) {
//       if (err) {
//         done(err);
//       } else {
//         done();
//       }
//     });
//   });
//
//   teardown(function() {
//     // remove any added items from the local db
//     // timestamps.forEach((timestamp) => {
//     //   Timestamp.find({requestedAt: timestamp}).remove().exec();
//     //   Record.find({requestedAt: timestamp}).remove().exec();
//     // })
//
//     // close the express server connection
//     server.close();
//   });
//
//   test('get all records', function(done) {
//     ajax(app)
//     .get('/api/records')
//     .expect('Content-Type', /json/)
//     .expect(200,done)
//   });
//
//   test('get most recent records', function(done) {
//     ajax(app)
//     .get('/api/records/recent')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end(function(err, res){
//       if (err) return done(err);
//       // console.log(res.body)
//       assert.equals(res.body.length, links.length);
//       done();
//     });
//   })
// });
