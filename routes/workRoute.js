var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //jump to account/user_id/
  res.send('respond with a resource');
});
router.get('/cp/', function(req, res, next) {
  //jump to account/user_id/
  var curUser;
  if (req.session.user) {
    curUser = req.session.user;
  } else {
    req.session.refer = '/create/cp/';
    res.redirect('/accounts/login/');
  }
  res.render('workSystem/createCp', { title: '首页', user: curUser });
});
module.exports = router;
