'use strict';

let commons = require('../common_names');

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

function formatDollarAmount(amount) {
  let arr = _.takeWhile(String(amount).split(''), (n) => {
    return n !== '.';
  });
  return arr.reduce(function(previous, current, index) {
    if (arr.slice(index).length % 3 === 0) {
      return previous + ',' + current;
    } else {
      return previous + current;
    }
  });
}

let formatCandidates = (candidates) => {
  candidates.forEach((element) => {
    element.id = element.fecId;
    // element.firstName = commonName(element);
    element.familiarName = commonName(element) + ' ' + lastName(element.name);
    element.raisedString = formatDollarAmount(element.officialRaised)
  })
  return candidates
}

module.exports = formatCandidates;
