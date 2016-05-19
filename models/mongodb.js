var mongoose = require('mongoose');
var create
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('yay!');
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
    var UserModel = mongodb.mongoose.model("User", UserSchema);
    var free = new UserModel({username: 'free'});
    console.log(free);
    var UserDAO = function(){};
    module.exports = new UserDAO();
});
exports.mongoose = mongoose;
