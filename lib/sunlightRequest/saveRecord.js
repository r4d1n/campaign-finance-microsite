'use strict';

let request = require('request');
let Record = require('../../models/record.model');

//receive data object and resolve w/ resulting Mongo doc

function saveRecord(data) {
  return new Promise((resolve, reject) => {
    var record = new Record({
      name: data.name,
      party: data.party,
      fecId: data.fec_id,
      officialRaised: Number(data.total_contributions),
      officialSpent: Number(data.total_disbursements),
      independentTotal: Number(data.total_expenditures),
      independentFor: Number(data.expenditures_supporting),
      independentAgainst: Number(data.expenditures_opposing),
      cashOnHand: Number(data.cash_on_hand),
      cashDate: data.cash_on_hand_date,
      requestedAt: data.timestamp
    })
    record.save((err, result) => {
      if (err) {
        reject('error saving record', err)
      }
      resolve(result)
    })
  })
}

module.exports = saveRecord;
