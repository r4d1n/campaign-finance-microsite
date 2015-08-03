'use strict';

function filterCandidate (name, arr) {
  let regex = new RegExp(name);
  let one = arr.filter((element) {
    return regex.exec(element);
  })
  if (!one) {
    console.log('candidate not found')
  } else {
    return one;
  }
}



module.exports = {
  filterCandidate : filterCandidate;
}
