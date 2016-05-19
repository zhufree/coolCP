var express = require('express');
var models = require('../models/mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var router = express.Router();
var User = models.User;
console.log(models);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next){
  res.send('login');
});
router.get('/logout', function(req, res, next){
  res.send('logout');
});
router.get('/register', function(req, res, next){
	var free = new User({username: 'free'}); 
	free.save();
	console.log(free);
  res.send(free.username);
});

module.exports = router;
