'use strict';

let d3 = require('d3');

let highlight = function(activeCandidate) {
  console.log('in viz', activeCandidate)
  let bars = d3.selectAll('.bar')
  .classed('inactive', true)
  .classed('active', false)

console.log('all bars', bars)

  let active = d3.selectAll('.bar')
  .filter(function(d, i) { return d.id === activeCandidate.id })


  active
  .classed('inactive', false)
  .classed('selected', true)
  console.log('active element', active)
}

module.exports = highlight;
