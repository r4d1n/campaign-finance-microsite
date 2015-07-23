'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecordSchema = new Schema({
	name: String,
	party: String,
	fec_id: String,
	campaign_raised: String,
	campaign_spent: String,
	total_independent: String,
	independent_for: String,
	independent_against: String,
	cash_on_hand: String,
	cash_date: String,
  requested_at: Date
});

module.exports = mongoose.model('Record', RecordSchema);
