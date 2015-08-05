db.records.find({}).forEach(function(doc) {
  var nums = ['officialRaised', 'officialSpent','independentTotal','independentFor',
  'independentAgainst',
  'cashOnHand']
  nums.forEach(function (field) {
    if(typeof(doc[field]) === 'string') {
      print('found string: ' + doc._id);
      var obj = {};
      obj[field] = Number(doc[field])
      db.records.update(
        { _id: doc._id},
        { $set : obj }
      )
    }
  })
})
