'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TimestampSchema = new Schema({
  requestedAt: Date
});

module.exports = mongoose.model('Timestamp', TimestampSchema);
