var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    

    // var UserDAO = function(){};
    // module.exports = new UserDAO();
});
var UserSchema = mongoose.Schema({
    username : String,
    nickname : String,
    password : String,
    register_date : {
        type: Date,
        default: Date.now
    },
});
//将Schema发布为Model
var UserModel = mongoose.model("User", UserSchema);
var free = new UserModel({username: 'free'});
exports.User = UserModel;
exports.mongoose = mongoose;
