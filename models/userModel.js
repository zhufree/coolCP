var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    username : String,
    nickname : String,
    password : String,
    register_date : {
        type: Date,
        default: Date.now
    },
});
//将Schema发布为Model
exports.UserModel = mongodb.mongoose.model("User", UserSchema);
// var UserDAO = function(){};
// module.exports = new UserDAO();
