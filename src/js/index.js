'use strict';

let React = require('react');

// scss
require('../styles/main.scss');



// client side js modules
let Card = require('./components/Card.jsx')

// require('./viz')
console.log('running js in the browser')

Card.init();
