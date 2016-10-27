var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CoupleSchema = Schema({
  descInfo: {
    name: String,
  },
  workInfo: {
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Couple", CoupleSchema);
