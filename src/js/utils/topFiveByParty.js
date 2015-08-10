'use strict';

function topFiveByParty (body) {
  let output = {
    R: [],
    D: []
  }

  body.forEach((el) => {
    output[el.party].push(el)
  })

  for (let arr in output) {
    output[arr] = output[arr].sort((a,b) => {
      return b.officialRaised - a.officialRaised;
    }).slice(0,5);
  }

  output = output.D.concat(output.R)

  return output;
}

module.exports = topFiveByParty;
