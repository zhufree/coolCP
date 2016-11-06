var parallel = require('async/parallel');
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
    res.redirect('/accounts/login/');
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
  parallel([
    function(cb){
      User.find({}, cb);
    },
    function(cb){
      Couple.find({}, cb);
    },
    function(cb){
      Article.find({}, cb);
    },
    function(cb){
      Video.find({}, cb);
    },
    function(cb){
      Picture.find({}, cb);
    },
    function(cb){
      Tag.find({}, cb);
    },
  ], function(err, results){
     // results contains both users and articles
     res.render('adminSystem/index', {
       title: 'Admin',
       user: curUser,
       users: results[0],
       couples: results[1],
       articles: results[2],
       videos: results[3],
       pictures: results[4],
       tags: results[5]
     });
  });
});

//用户管理
router.post('/users/delete/', function(req, res, next) {
  //删除一个/多个用户
});
router.get('/users/:uid', function(req, res, next) {
  //根据id展示用户详细信息
  User.findOne({'accountInfo.uid': req.params.uid}, function(err, result) {
    res.render('adminSystem/user_detail', {title: '用户详情', user: result});
  });
});
router.post('/users/:userId', function(req, res, next) {
  //根据id选定用户并修改详细信息
  res.redirect('/users/:userId');
});


//cp管理
router.get('/couples/:_id', function(req, res, next) {
  //根据id展示用户详细信息
  Couple.findOne({_id: req.params._id}, function(err, result) {
    res.render('adminSystem/couple_detail', {title: 'couple详情', couple: result});
  });
});
router.post('/couple/delete/', function(req, res, next) {
  //删除一个/多个cp
  res.render('adminSystem/cp_detail');
});


//作品管理
router.get('/works/picture/:_id', function(req, res, next) {
  //根据id展示用户详细信息
  Picture.findOne({_id: req.params._id}, function(err, result) {
    res.render('adminSystem/work_detail', {title: '作品详情', picture: result});
  });
});
router.get('/works/video/:_id', function(req, res, next) {
  //根据id展示用户详细信息
  Video.findOne({_id: req.params._id}, function(err, result) {
    res.render('adminSystem/work_detail', {title: '作品详情', video: result});
  });
});
router.get('/works/article/:_id', function(req, res, next) {
  //根据id展示用户详细信息
  Article.findOne({_id: req.params._id}, function(err, result) {
    res.render('adminSystem/work_detail', {title: '作品详情', article: result});
  });
});
router.post('/works/delete/', function(req, res, next) {
  res.render('adminSystem/work_detail');
});

module.exports = router;
