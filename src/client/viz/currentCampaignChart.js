'use strict';

let d3 = require('d3');

let { height, width, margin, colors } = require('./setup');


function draw (data) {
  let svg = d3.select('#bar-chart-target').append('svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  let x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  let y = d3.scale.linear()
  .range([height, 0]);

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.totalReceipts; }) + 10000000]);

  let group = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g")

  let bars = svg.selectAll("g")
  .append("rect")
  .attr("class", "bar")
  .attr("id", function(d) { return 'svg-bar-' + d.id }) // for click events
  .attr("x", function(d) { return x(d.name); })
  .attr("width", x.rangeBand())
  .attr("height", 0 )
  .attr("y", height) // height here is the whole chart
  .transition()
  .delay(function (d, i) { return i * 200; })
  .attr("y", function(d) { return y(d.totalReceipts); })
  .attr("height", function(d) { return height - y(d.totalReceipts); })

  let millions = svg.selectAll("g")
  .append("text")
  .attr("text-anchor", "middle")
  .attr('class', 'bar-label-black')
  .attr("x", function(d,i) { return x(d.name) + x.rangeBand() / 2} )
  .attr("dy", ".75em")
  .attr('opacity', 0)
  .text(function(d) { return d.million; })
  .attr("y", height) // height here is the whole chart
  .transition()
  .delay(function (d, i) { return i * 200; })
  .attr('opacity', 1)
  .attr("y", function(d,i) { return y(d.totalReceipts) - 30 } )

}

module.exports = draw;
