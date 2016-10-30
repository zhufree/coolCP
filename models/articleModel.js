var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ArticleSchema = Schema({
  basicInfo: {
    title: String,
    author: {type:Schema.Types.ObjectId,ref:'User'},
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    wordCount: Number,
    paraCount: Number,
    paras: [{para: String}]
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
module.exports = mongoose.model("Article", ArticleSchema);
