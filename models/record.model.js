'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
	name: String,
	party: String,
	fecId: String,
	officialRaised: String,
	officialSpent: String,
	independentTotal: String,
	independentFor: String,
	independentAgainst: String,
	cashOnHand: String,
	cashDate: String,
  requestedAt: Date
});

module.exports = mongoose.model('Record', RecordSchema);
