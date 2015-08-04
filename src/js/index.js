'use strict';

let React = require('react');

// scss
require('../styles/main.scss');



// client side js modules
let NumberBar = require('./components/NumberBar.jsx')

// require('./viz')
console.log('running js in the browser')

NumberBar.init();
