var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OriginSchema = Schema({
  basicInfo: {
    name: String,
    category: String, // 哪种作品
    relatedCouples: [{type:Schema.Types.ObjectId,ref:'Couple'}]
  },
  countInfo: {
    likeCount: 0
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Origin", OriginSchema);
