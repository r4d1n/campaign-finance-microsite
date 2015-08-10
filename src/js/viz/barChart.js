'use strict';

let d3 = require('d3');

let { height, width, margin, colors } = require('./setup');


function draw (data) {
  let svg = d3.select('#bar-chart-container').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  let y = d3.scale.linear()
  .range([height, 0]);

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.officialRaised; })]);

  let bars = svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("data-id", function(d) { return d.id }) // for click events
  .attr("x", function(d) { return x(d.name); })
  .attr("width", x.rangeBand())
  .attr("height", 0 )
  .attr("y", height) // height here is the whole chart
  .transition()
  .delay(function (d, i) { return i * 150; })
  .attr("y", function(d) { return y(d.officialRaised); })
  .attr("height", function(d) { return height - y(d.officialRaised); })
}

module.exports = draw;
