var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CoupleSchema = Schema({
  basicInfo: {
    name: String,
    coverImage: String,
    description: String,
    roles: [{type:Schema.Types.ObjectId,ref:'Role'}],
    from: [{type:Schema.Types.ObjectId,ref:'Origin'}]
  },
  workInfo: {
    pictures: [{type:Schema.Types.ObjectId,ref:'Picture'}],
    videos: [{type:Schema.Types.ObjectId,ref:'Video'}],
    articles: [{type:Schema.Types.ObjectId,ref:'Article'}]
  },
  otherInfo: {
    tags: [{type:Schema.Types.ObjectId,ref:'Tag'}],
    visitCount: Number,
    likeCount: Number
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Couple", CoupleSchema);
