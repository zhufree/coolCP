var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = Schema({
  basicInfo: {
    author: {type:Schema.Types.ObjectId,ref:'User'},
    content: String,
    replyTo: {type:Schema.Types.ObjectId,ref:'Comment'}
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Comment", CommentSchema);
