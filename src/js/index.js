'use strict';
console.log('running js in the browser')

let React = require('react');

// scss
require('../styles/main.scss');



// client side js modules
let util = require('./util')
let Card = require('./components/Card.jsx')

// let viz = require('./viz')

Card.init();
// viz.init()
