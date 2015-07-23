'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimestampSchema = new Schema({
  request_time: Date
});

module.exports = mongoose.model('Timestamp', TimestampSchema);
