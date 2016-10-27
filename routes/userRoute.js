var express = require('express');
var router = express.Router();

var User = require('../models/userModel');
var Site = require('../models/siteModel');

var query = Site.find({});

/*
用户系统导航
注册
登陆
登出
访问个人信息页面
自己的页面有修改权限
*/
router.get('/', function(req, res, next) {
  //jump to account/user_id/
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
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
        req.session.user = user;
        if (req.session.ref) {
          res.redirect(req.session.refer);
        } else {
          res.redirect('/');
        }
      } else {
        res.send('wrong password');
      }
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
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
      password1: req.body.password1,
      password2: req.body.password2
    }
  });
  if (accountInfo.password1 === accountInfo.password2) {
    query.exec(function(err, siteInfo) {
      //如果没有全局信息，实例化新对象
      if (siteInfo.length === 0) {
        siteInfo = new Site({
          userInfo: {
            userCount: 0,
            visitCount: 0
          },
          cmsInfo: {
            cpCount: 0,
            picCount: 0,
            videoCount: 0,
            articleCount: 0
          }
        });
        siteInfo.save();
      } else {
        //否则，注册用户数+1
        siteInfo[0].userInfo.userCount += 1;
        siteInfo[0].save();
        newUser.accountInfo.uid = siteInfo[0].userInfo.userCount + 10000;
        newUser.save();
      }
    });
    newUser.save();
    //redirect to index page
    req.session.user = newUser;
    res.redirect('/');
  } else {
    res.send('密码不一致');
  }

});

module.exports = router;
