var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //jump to account/user_id/
  res.send('respond with a resource');
});
router.get('/cp/', function(req, res, next) {
  //jump to account/user_id/
  res.render('workSystem/createCp');
});
module.exports = router;
