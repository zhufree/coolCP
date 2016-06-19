var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SiteSchema = Schema({
  userInfo: {
    userCount: Number,
    visitCount: Number
  },
  cmsInfo: {
    cpCount: Number,
    picCount: Number,
    videoCount: Number,
    articleCount: Number
  }
});
//将Schema发布为Model
module.exports = mongoose.model("Site", SiteSchema);
// var UserDAO = function(){};
// module.exports = new UserDAO();
