var express = require('express');
var router = express.Router();

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
  res.send('register');
});

module.exports = router;
