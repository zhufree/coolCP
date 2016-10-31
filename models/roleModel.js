var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoleSchema = Schema({
  basicInfo: {
    name: String,
    nicknames: [String],
    relatedCouples: [{type:Schema.Types.ObjectId,ref:'Couple'}]
  },
  countInfo: {
    likeCount: 0
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Role", RoleSchema);
