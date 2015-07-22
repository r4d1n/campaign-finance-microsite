let candidates = require('../candidates');
let request = require('request');
let env = require('node-env-file');
env('.env');

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
  request(uri, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body)
      var record = new Record({
        name: body.name,
        party: body.party,
        fec_id: body.fec_id,
        campaign_raised: body.total_contributions,
        campaign_spent: body.total_disbursements,
        total_independent: body.total_expenditures,
        independent_for: body.expenditures_supporting,
        independent_against: body.expenditures_opposing,
        cash_on_hand: body.cash_on_hand,
        cash_on_hand_date: body.cash_on_hand_date
      })
      record.save((err, result) => {
        if (err) {
          throw (err)
        }
        console.log('saved a new record')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })
}

module.exports = {
  requestAndSaveResource: requestAndSaveResource
};
