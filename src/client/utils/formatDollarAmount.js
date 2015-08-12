'use strict';

module.exports = function formatDollarAmount(amount) {
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
