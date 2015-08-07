'use strict';

let React = require('react');

// scss
require('../styles/main.scss');


// client side js modules
let App = require('./components/App.jsx')

// let viz = require('./viz')

let load = require('./utils/load')
let formatCandidates = require('./utils/formatCandidates')

load('api/records/latest')
.then((body) => {
  let candidates = formatCandidates(body);
  React.render(<App candidates={candidates} />,
  document.getElementById('card-container'));
})
