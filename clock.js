'use strict';

require('babel/register');

var sunlightRequest = require('./lib/sunlightRequest');

var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 15 14 * * 0-6',
  onTick: function() {
    console.log('Executing Sunlight Requests');
    sunlightRequest.init();
  },
  start: true,
  timeZone: "America/Los_Angeles"
});
