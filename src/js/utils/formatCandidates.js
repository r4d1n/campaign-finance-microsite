'use strict';

let commons = require('../common_names');

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
  let arr = _.takeWhile(String(amount).split(''), (n) => {
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

let formatCandidates = (candidates) => {

  candidates.forEach((element) => {
    element.id = element.fecId;
    element.firstName = commonName(element);
    element.raisedString = formatDollarAmount(element.officialRaised)
  })

  return candidates

}

module.exports = formatCandidates;
