var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coolcp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
});
exports.mongoose = mongoose;
