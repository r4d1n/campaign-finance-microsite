'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
	name: String,
	party: String,
	fecId: String,
	officialRaised: Number,
	officialSpent: Number,
	independentTotal: Number,
	independentFor: Number,
	independentAgainst: Number,
	cashOnHand: Number,
	cashDate: String,
  requestedAt: Date
});

module.exports = mongoose.model('Record', RecordSchema);
