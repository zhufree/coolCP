var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Site = require('../models/siteModel');
var Couple = require('../models/coupleModel');
var Tag = require('../models/tagModel');
var Article = require('../models/articleModel');
var Video = require('../models/videoModel');
var Picture = require('../models/pictureModel');
var Comment = require('../models/commentModel');

var userQuery = User.find({});
/*
admin后台管理
增：添加新条目
删：删除条目
查：查找与检索
改：修改条目信息

用bootstrap写
index：首页

user_index
cp_index
work_index

user_detail
cp_detail
work_pic_detail
work_video_detail
work_article_detail
*/
// var query = Site.find({});
/* GET home page. */
router.all('*', function(req, res, next) {
  if (!req.session.user) {
    req.session.refer = '/admin/';
    res.redirect('../accounts/login/');
  } else {
    if (req.session.user.accountInfo.uid === '10003') {
      var curUser = req.session.user;
      next();
    } else {
      var err = new Error('You are not authenticated!');
  		err.status = 401;
  		next(err);
    }
  }
});
router.get('/', function(req, res, next) {
  //返回管理页面首页
  var users;
  User.find({}, function(err, users) {
    if (err) {
      users = [];
    }
    Couple.find({}, function(err, couples) {
      if (err) {
        couples = [];
      }
      Article.find({}, function(err, articles) {
        if (err) {
          articles = [];
        }
        Video.find({}, function(err, videos) {
          if (err) {
            videos = [];
          }
          Picture.find({}, function(err, pictures) {
            if (err) {
              pictures = [];
            }
            Tag.find({}, function(err, tags) {
              if (err) {
                tags = [];
              }
              res.render('adminSystem/index', {
                title: 'Admin',
                user: curUser,
                users: users,
                couples: couples,
                articles: articles,
                videos: videos,
                pictures: pictures,
                tags: tags
              });
            });
          });
        });
      });
    });
  });
});

//用户管理
router.get('/accounts/', function(req, res, next) {
  //返回所有用户列表
  res.render('adminSystem/user_index');
});
router.post('/accounts/delete/', function(req, res, next) {
  //删除一个/多个用户
});
router.get('/accounts/:userId', function(req, res, next) {
  //根据id展示用户详细信息
  res.render('adminSystem/user_detail');
});
router.post('/accounts/:userId', function(req, res, next) {
  //根据id选定用户并修改详细信息
  res.redirect('/accounts/:userId');
});


//cp管理
router.get('/couple/', function(req, res, next) {
  //返回所有cp列表
  res.render('adminSystem/cp_index');
});
router.post('/couple/delete/', function(req, res, next) {
  //删除一个/多个cp
  res.render('adminSystem/cp_detail');
});


//作品管理
router.get('/works/', function(req, res, next) {
  //返回作品列表
  res.render('adminSystem/work_index');
});
router.post('/works/delete/', function(req, res, next) {
  //删除一个/多个作品
  res.render('adminSystem/work_pic_detail');
});

module.exports = router;
