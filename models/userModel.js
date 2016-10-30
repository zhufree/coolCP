var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
  accountInfo: {
    uid: String,
    nickname: String,
    email: String,
    password: String,
    registerDate : {
      type: Date,
      default: Date.now
    }
  },
  personInfo: {
    bornDate: String,
    age: Number,
    sexual: String
  }
});
//将Schema发布为Model
 module.exports = mongoose.model("User", UserSchema);
// var UserDAO = function(){};
// module.exports = new UserDAO();
