'use strict';

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

function formatName (name) {
  let arr = name.split(',').reverse();
  return arr.map((el) => {
    el = el.trim().split('');
    console.log(el);
    let i = 1;
    while (i < el.length) {
      el[i] = el[i].toLowerCase();
      ++i;
    }
    console.log(el.join(''));
    return el.join('');
  }).join(' ')
}

module.exports = {
  filterByName: filterByName,
  formatName: formatName
}
