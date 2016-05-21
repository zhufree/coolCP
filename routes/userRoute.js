var express = require('express');
var models = require('../models/mongodb');

var router = express.Router();
var User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  //jump to account/user_id/
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  //
  res.render('userSystem/login', {title: 'Login'});
});
router.post('/login', function(req, res, next) {
  //get data from req

  //check username and password

  //login user or return error
  res.send('login send');
});

router.get('/logout', function(req, res, next) {
  res.send('logout');
});

router.get('/register', function(req, res, next) {
  res.render('userSystem/register', {title: 'Register'});
});

router.post('/register', function(req, res, next) {
  //get data in req

  //handle data

  //redirect to index page
  res.send('register send');
})

module.exports = router;
