'use strict';

let PartyStore = Reflux.createStore({
  listenables: [require('../actions/Actions.jsx')],


  getInitialState () {
    this.party = 'R';
    return this.party;
  },

  onUpdateSelectedParty (party) {
    this.party = party;
    this.trigger(this.party);
  }

});

module.exports = PartyStore;
