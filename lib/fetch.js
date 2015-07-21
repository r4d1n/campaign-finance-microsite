let candidates = require('../candidates');
let request = require('request');
let env = require('node-env-file');
env('.env');

let apiBase = "http://realtime.influenceexplorer.com/api/candidates/";
let queryStringBase = "?format=json&page=1&page_size=10&fec_id=";
let keyString = '&apikey=' + process.env.SUNLIGHT_API_KEY;

let resources = (function buildLinks() {
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
})();

// console.log(apiBase);
// console.log(candidates);
// console.log(resources.R[0]);

function getData () {
  request(resources.R[0], function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    } else {
      if (error) console.log(error);
      console.log('huh')
    }
  })
}

module.exports = {
  getData: getData
};
