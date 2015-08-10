'use strict';

let CandidateStore = Reflux.createStore({
  listenables: [require('../actions/Actions.jsx')],

  init() {
    this.listenTo(require('./PartyStore.jsx'));
  },

  getInitialState () {
    this.candidate = { id : 0 };
    return this.candidate
  },

  onUpdateSelectedCandidate (candidate) {
    this.candidate = candidate;
    this.trigger(this.candidate);
  }

});

module.exports = CandidateStore;
