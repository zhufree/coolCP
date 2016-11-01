var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OriginSchema = Schema({
  basicInfo: {
    name: String,
    category: String, // 哪种作品
    relatedCouples: [{type:Schema.Types.ObjectId,ref:'Couple'}]
  },
  countInfo: {
    likeCount: Number,
    coupleCount: Number
  }
});
OriginSchema.statics.getOrCreate = function(name, category) {
  var Origin = this;
  var result;
  this.find({'basicInfo.name': name}, function(err, origin) {
    if (err) {
      console.log(err);
    }
    if (origin.length === 0) {
      var newOrigin = new Origin({
        basicInfo: {
          name: name,
          category: category,
          relatedCouples:[]
        },
        countInfo: {
          likeCount: 0,
          coupleCount: 0,
        }
      });
      newOrigin.save();
      result = newOrigin;
    } else {
      origin[0].countInfo.coupleCount += 1;
      result = origin[0];
    }
  }).then(function() {
    callback(result);
  });
};

//将Schema发布为Model
module.exports = mongoose.model("Origin", OriginSchema);
