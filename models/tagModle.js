var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TagSchema = Schema({
  basicInfo: {
    name: String,
    nameEn: String,
    category: String
  },
  countInfo: {
    workCount: Number,
    coupleCount: Number,
    userCount: Number
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Tag", TagSchema);
