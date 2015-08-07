'use strict';

let d3 = require('d3');

let highlight = function(activeCandidate) {
  let bars = d3.selectAll('.bar')
  .classed('inactive', true)
  .classed('selected', false)

  let active = d3.selectAll('.bar')
  .filter(function(d, i) { return d.id === activeCandidate.id })

  let activePartyClass;
  activeCandidate.party === 'R' ? activePartyClass = 'gop' : activePartyClass = 'dem';

  active
  .classed('inactive', false)
  .classed('selected', true)
  .classed(activePartyClass, true)
}

module.exports = highlight;
