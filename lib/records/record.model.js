'use strict';

var mongoose = require('mongoose');
// var timestamps = require('mongoose-timestamp');

var Schema = mongoose.Schema;

// mongoose.plugin(timestamps,  {
//   createdAt: 'created_at',
//   updatedAt: 'updated_at'
// });

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
  created_at: Number
});

module.exports = mongoose.model('Record', RecordSchema);
