'use strict';

let request = require('request');
let _ = require('lodash');
let Record = require('../../models/record.model');

function saveRecord(data) {
  // console.log('data in save fn', data)
  console.log('pre-save record time', data.timestamp);
  console.log('pre-save data obj', data)
  return new Promise((resolve, reject) => {
    var record = new Record({
      name: data.name,
      party: data.party,
      fecId: data.fec_id,
      officialRaised: data.total_contributions,
      officialSpent: data.total_disbursements,
      independentTotal: data.total_expenditures,
      independentFor: data.expenditures_supporting,
      independentAgainst: data.expenditures_opposing,
      cashOnHand: data.cash_on_hand,
      cashDate: data.cash_on_hand_date,
      requestedAt: data.timestamp
    })
    record.save((err, record) => {
      if (err) {
        reject('error saving record', err)
      }
      // console.log('successfully saved a new record', result)
      console.log('post-save record time', data.timestamp);
      resolve(record)
    })
  })
}

module.exports = saveRecord;
