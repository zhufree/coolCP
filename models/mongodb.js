var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coolCP');
exports.mongoose = mongoose;