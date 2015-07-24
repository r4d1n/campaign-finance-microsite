'use strict';

require('babel/register');

var sunlightRequest = require('./lib/sunlightRequest');

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 00 00 * * 0-6',
  onTick: function() {
    var time = new Date();
    console.log('Executing Sunlight Requests,' time);
    sunlightRequest.init();
  },
  start: true,
  timeZone: "America/Los_Angeles"
});
