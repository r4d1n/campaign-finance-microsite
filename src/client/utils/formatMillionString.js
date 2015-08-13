'use strict';

// expects previously formatted dollar amount string

module.exports = function formatMillionString (amount) {
  return (_.takeWhile(String(amount).split(''), (n) => {
    return n !== ',';
  })).join('') + 'M';
}
