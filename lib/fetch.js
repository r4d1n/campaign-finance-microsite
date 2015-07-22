let candidates = require('../candidates');
let request = require('request');
let env = require('node-env-file');
env('.env');

let Record = require('./records/record.model');

let apiBase = "http://realtime.influenceexplorer.com/api/candidates/";
let queryStringBase = "?format=json&page=1&page_size=10&fec_id=";
let keyString = '&apikey=' + process.env.SUNLIGHT_API_KEY;

let resources = buildLinks();

function buildLinks() {
  let obj = {
    'D' : [],
    'R' : []
  };

  obj['D'] = candidates['D'].map((element) => {
    let q = apiBase + queryStringBase + element.FEC_ID + keyString;
    return q;
  });

  obj['R'] = candidates['R'].map((element) => {
    let q = apiBase + queryStringBase + element.FEC_ID + keyString;
    return q;
  });

  return obj;
};

// console.log(apiBase);
// console.log(candidates);
// console.log(resources.R[0]);

function requestAndSaveResource (uri) {
  // if (!uri) { uri = resources.R[0] } ;
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
        created_at: +new Date()
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

module.exports = {
  requestAndSaveResource: requestAndSaveResource
};
