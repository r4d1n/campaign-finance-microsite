'use strict';

let howManyTablets = require('../utils/howManyTablets');
let formatDollarAmount = require('../utils/formatDollarAmount');

let CandidateStore = Reflux.createStore({
  listenables: [require('../actions/CardActions.jsx')],

  init: function() {
  },

  getInitialState: function() {
    this.candidate = {
      id : 0,
      tablets: 0
     };
    return this.candidate;
  },

  onUpdateSelectedCandidate (model) {
    this.candidate = model;
    this.candidate.tablets = formatDollarAmount(howManyTablets(this.candidate.officialRaised));
    this.trigger(this.candidate);
  },

});

module.exports = CandidateStore;
