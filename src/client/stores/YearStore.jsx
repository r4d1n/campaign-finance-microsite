'use strict';

// this store is for keeping track of which election year should be shown

let formatDollarAmount = require('../utils/formatDollarAmount');

let YearStore = Reflux.createStore({
  listenables: [require('../actions/Actions.jsx')],

  getInitialState: function() {
    this.year = 2012;
    return this.year;
  },

  onUpdateSelectedYear (value) {
    this.activeYear = value;
    this.trigger(this.activeYear);
  },

});

module.exports = YearStore;
