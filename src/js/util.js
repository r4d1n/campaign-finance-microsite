'use strict';

let takeWhile = require('lodash.takewhile');

let commons = require('./common_names');


function filterByName (name, arr) {
  let regex = new RegExp(name);
  let one = arr.filter((element) => {
    return regex.exec(element);
  })
  if (!one) {
    console.log('candidate not found')
  } else {
    return one;
  }
}

function firstName (name) {
  let arr = name.split(',').reverse();
  return arr[0].trim().split(' ')[0];
}

function lastName (name) {
  let arr = name.split(',').reverse();
  return arr[0].trim().split(' ')[1];
}

function commonName (candidate) {
  let i = 0;
  while (i < commons.length) {
    if (commons[i].fecId === candidate.fecId) {
      return commons[i].common;
    }
    i++
  }
}

function formatDollarAmount(amount) {
  let arr = takeWhile(String(amount).split(''), (n) => {
    return n !== '.';
  })
  let i = arr.length - 1;
  while (i > 0) {
    if ((i + 1) % 3 === 0) {
      arr.splice(i, 0, ',')
    }
    --i;
  }
  return arr.join('')
}

module.exports = {
  commonName: commonName,
  formatDollarAmount: formatDollarAmount
}
