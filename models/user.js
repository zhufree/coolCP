var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var UserSchema = new Schema({
    username : String,
    nickname : String,
    password : String,
    register_date : { 
        type: Date, 
        default: Date.now
    },
});
var User = mongodb.mongoose.model("User", UserSchema);
var UserDAO = function(){};
module.exports = new UserDAO();