'use strict';

let _ = require('lodash')

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

function formatDollarAmount(amount) {
  console.log(amount)
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

module.exports = {
  filterByName: filterByName,
  firstName: firstName,
  formatDollarAmount: formatDollarAmount
}
