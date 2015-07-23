'use strict';

let request = require('request');
let _ = require('lodash');
let Record = require('../../models/record.model');

function saveRecord(data, timestamp) {
  console.log('data in save fn', data)
  return new Promise((resolve, reject) => {
    var record = new Record({
      name: data.name,
      party: data.party,
      fec_id: data.fec_id,
      campaign_raised: data.total_contributions,
      campaign_spent: data.total_disbursements,
      total_independent: data.total_expenditures,
      independent_for: data.expenditures_supporting,
      independent_against: data.expenditures_opposing,
      cash_on_hand: data.cash_on_hand,
      cash_on_hand_date: data.cash_on_hand_date,
      requested_at: timestamp
    })
    record.save((err, result) => {
      if (err) {
        reject('error saving record', err)
      }
      console.log('successfully saved a new record', result)
      resolve(result)
    })
  })
}

export default saveRecord;
