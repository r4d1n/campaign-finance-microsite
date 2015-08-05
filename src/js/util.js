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

function firstName (name) {
  let arr = name.split(',').reverse();
  return arr[0]
}

module.exports = {
  filterByName: filterByName,
  firstName: firstName
}
