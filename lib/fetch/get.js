let request = require('request');
let _ = require('lodash');
let Record = require('../records/record.model');

export function getAndSave (uri, timestamp) {
  request(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      data = data.results[0];
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
          console.log(err)
        }
        console.log('saved a new record', record)
      })
    }
  })
}
