'use strict';

let ajax = require('superagent');

ajax
.get('/api/records/recent')
.end(function(err, res){
  console.log(res.body)
});
