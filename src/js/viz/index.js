'use strict';

let ajax = require('superagent');
let d3 = require('d3');

let setup = require('./setup');

let { height, width, margin, colors } = setup;


function draw (data) {
  let svg = d3.select('#chart-container').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // assign colors
  // data.forEach((el, index) => {
  //   el.hex = colors[index];
  // })

  let x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  let y = d3.scale.linear()
  .range([height, 0]);

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.officialRaised; })]);


  svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar inactive")
  .attr("x", function(d) { return x(d.name); })
  .attr("width", x.rangeBand())
  .attr("y", function(d) { return y(d.officialRaised); })
  .attr("height", function(d) { return height - y(d.officialRaised); })
  // .attr("fill", "#333")

}


function init (data) {
  draw(data);
}

module.exports = {
  init: init
}
