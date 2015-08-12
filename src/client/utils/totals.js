'use strict';

function addCategory (candidates, category) {
  return candidates.reduce((prev,curr) => {
    return prev[category] + curr[category]
  })
}

function totalRaised (candidates) {
  return addCategory(candidates, officialRaised)
}

function totalSpent (candidates) {
  return addCategory(candidates, officialSpent)
}

module.exports = {
  totalRaised: totalRaised,
  totalSpent: totalSpent
}
