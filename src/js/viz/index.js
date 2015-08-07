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

  // let xAxis = d3.svg.axis()
  // .scale(x)
  // .orient("bottom");
  //
  // let yAxis = d3.svg.axis()
  // .scale(y)
  // .orient("left")
  // .ticks(1, "$");
  //
  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);
  //
  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis)
  //   .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", ".71em")
  //     .style("text-anchor", "end")
  //     .text("Amount Raised");

  svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.name); })
  .attr("width", x.rangeBand())
  .attr("y", function(d) { return y(d.officialRaised); })
  .attr("height", function(d) { return height - y(d.officialRaised); })
  .attr("fill", "#333")

}


function init (data) {
  draw(data);
}

module.exports = {
  init: init
}
