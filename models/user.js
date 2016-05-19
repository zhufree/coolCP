var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
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
var UserModel = mongodb.mongoose.model("User", UserSchema);
var free = new UserModel({username: 'free'});
console.log(free);
var UserDAO = function(){};
module.exports = new UserDAO();
