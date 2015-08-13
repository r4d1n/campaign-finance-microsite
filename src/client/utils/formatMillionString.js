'use strict';

module.exports = function formatMillionString (amount) {
  return (_.takeWhile(String(amount).split(''), (n) => {
    return n !== ',';
  })).join('') + 'M';
}
