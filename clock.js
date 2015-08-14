'use strict';

require('babel/register');

var mongoose = require('mongoose');
var sunlightRequest = require('./src/server/sunlightRequest');

if (process.env.NODE_ENV==='production') {
  mongoose.connect(process.env.MONGOLAB_URI);
}

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 00 00 * * 0',
  onTick: function() {
    console.log('Executing Sunlight Requests');
    sunlightRequest.init();
  },
  start: true,
  timeZone: "America/Los_Angeles"
});
