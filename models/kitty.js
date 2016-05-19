var mongodb = require('mongodb');
var Schema = mongodb.mongoose.Schema;

var KittySchema = mongoose.Schema({
	name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);
var slience = new Kitten({name: 'Slience'});
console.log(slience.name);