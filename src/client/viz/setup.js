'use strict';

let targetEl = document.getElementById('bar-chart-target');

console.log(targetEl);
let containerHeight = targetEl.offsetHeight;
let containerWidth = targetEl.offsetWidth;

console.log(containerWidth, containerHeight)

let margin = { top: 20, right: 10, bottom: 20, left: 10};
let height = containerHeight - margin.top - margin.bottom;
let width = containerWidth - margin.left - margin.right;

let colors = [ '#FFA21A','#E82070','#2F31FF','#20E8A8','#E3FF28']

module.exports = {
  margin: margin,
  width: width,
  height: height,
  colors: colors
}
