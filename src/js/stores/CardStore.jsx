'use strict';

let CardStore = Reflux.createStore({
  listenables: [require('../actions/CardActions.jsx')],

  init: function() {
  },

  getInitialState: function() {
    this.candidate = { id : 0 };
    return this.candidate;
  },

  onUpdateSelectedCandidate (model) {
    this.candidate = model;
    this.trigger(this.candidate);
  },

});

module.exports = CardStore;
