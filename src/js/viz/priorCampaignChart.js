'use strict';

let d3 = require('d3');

let { height, width, margin, colors } = require('./setup');


function draw (data) {

  // data.forEach((element) => {
  //   element.receipts = Number(element.receipts);
  // })

  console.log(data)

  let svg = d3.select('#bar-chart-target').append('svg')
  .attr("id", "prior-chart-svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  let y = d3.scale.linear()
  .range([height, 0]);

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.receipts; })]);

  let bars = svg.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar selected")
  .attr("x", function(d) { return x(d.name); })
  .attr("width", x.rangeBand())
  .attr("height", 0)
  .attr("y", height) // height here is the whole chart
  .transition()
  .delay(function (d, i) { return i * 300; })
  .attr("y", function(d) { return y(d.receipts); })
  .attr("height", function(d) { return height - y(d.receipts); })
  .attr("class", function(d) {
    return d.party === "R" ? 'gop bar selected' : 'dem bar selected';
  })

  // TODO: labels!!

}

module.exports = draw;
