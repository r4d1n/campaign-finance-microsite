'use strict';

let commons = require('../common_names');

let formatDollarAmount = require('./formatDollarAmount');

function firstName (name) {
  let arr = name.split(',').reverse();
  return arr[0].trim().split(' ')[0];
}

function lastName (name) {
  let arr = name.split(',').reverse();
  return arr[1].trim().split(' ');
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


function formatCandidates (candidates) {
  candidates.forEach((element) => {
    element.id = element.fecId;
    element.familiarName = commonName(element) + ' ' + lastName(element.name);
    element.raisedString = formatDollarAmount(element.totalReceipts)
    element.initials = element.familiarName.split(' ').map((word) => {
      return word.slice(0,1)
    }).join('')
  })
  return candidates
}

module.exports = formatCandidates;
