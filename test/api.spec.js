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
//   let timestamps = [];
//
//   setup(function(done) {
//     // start the app each time, return server object to close
//     server = app.listen(port, function (err, result) {
//       if (err) {
//         done(err);
//       } else {
//         sunlightRequest.init();
//         done();
//       }
//     });
//   });
//
//   teardown(function() {
//     // remove any added items from the local db
//     timestamps.forEach((timestamp) => {
//       Timestamp.find({requestedAt: timestamp}).remove().exec();
//       Record.find({requestedAt: timestamp}).remove().exec();
//     })
//
//     // close the express server connection
//     server.close();
//   });
//
//   test('get all records', function(done) {
//     ajax(app)
//     .get('/api/records')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end(function(err, res){
//       if (err) return done(err);
//       res.body.forEach((element) => {
//         // console.log(element);
//         // console.log(new Date(element.requestedAt));
//         // assert.isAbove(timestamps.indexOf(new Date(element.requestedAt)), -1);
//       })
//         done();
//     });
//   });
//
//   test('get most recent records', function(done) {
//     // timestamp = Date.now();
//     // getData(links[0], timestamp)
//     // .then((data) => {
//     //   assert(typeof data === "object");
//     //   assert.ok(data.name);
//     //   assert.ok(data.timestamp);
//     //   done();
//     // })
//     // .catch((err) => {
//     //   done(err);
//     // });
//     // done();
//   });
//
// });
