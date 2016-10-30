var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VideoSchema = Schema({
  basicInfo: {
    title: String,
    uploader: {type:Schema.Types.ObjectId,ref:'User'},
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    isOriginal: Boolean,
    link: String,
    timeLast: Number
  },
  otherInfo: {
    tags: [{type:Schema.Types.ObjectId,ref:'Tag'}],
    couple: {type:Schema.Types.ObjectId,ref:'Couple'},
    visitCount: Number,
    likeCount: Number,
    comments: [{type:Schema.Types.ObjectId,ref:'Comment'}]
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Video", VideoSchema);
