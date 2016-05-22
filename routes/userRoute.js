var express = require('express');
var router = express.Router();

var models = require('../models/userModel');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coolcp', function(error) {
  if (error) {
    console.log(error);
  }
});
var User = models.UserModel;

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
  User.findOne({'accountInfo.email': req.body.email}, function(err, user) {
    if (err) {
      res.send('no such user');
    } else if (!user) {
      res.send('no such user!');
    } else {
      if (req.body.password == user.accountInfo.password) {
        res.send('login!');
      } else {
        res.send('wrong password');
      }
    }
  });
});

router.get('/logout', function(req, res, next) {
  res.send('logout');
});

router.get('/register', function(req, res, next) {
  res.render('userSystem/register', {title: 'Register'});
});

router.post('/register', function(req, res, next) {
  //get data in req
  var newUser = new User({
    accountInfo: {
      email: req.body.email,
      password: req.body.password
    }
  });
  newUser.save();
  //redirect to index page
  res.redirect('/');
});

module.exports = router;
