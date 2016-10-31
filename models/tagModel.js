var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TagSchema = Schema({
  basicInfo: {
    name: String,
    // nameEn: String,
    category: String
  },
  countInfo: {
    workCount: Number,
    coupleCount: Number,
    // userCount: Number
  }
});
TagSchema.statics.getOrCreate = function(name, category) {
  var Tag = this;
  var result;
  this.find({'basicInfo.name': name}, function(err, tag) {
    if (err) {
      console.log(err);
    }
    if (tag.length === 0) {
      var newTag = new Tag({
        basicInfo: {
          name: name,
          category: category
        },
        countInfo: {
          workCount: 1,
          coupleCount: 1,
        }
      });
      // console.log(newTag);
      newTag.save();
      result = newTag;
    } else {
      tag.workCount += 1;
      tag.coupleCount += 1;
      result = tag;
    }
  });
  return result;
};
//将Schema发布为Model
module.exports = mongoose.model("Tag", TagSchema);
