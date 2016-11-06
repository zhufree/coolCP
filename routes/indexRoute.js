var express = require('express');
var router = express.Router();
var Site = require('../models/siteModel');
var Couple = require('../models/coupleModel');
var query = Site.find({});
/*
一级路由导航
首页/发现/动态/创建新cp/作品
*/
router.get('/', function(req, res, next) {
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
      //否则，访问数+1
      siteInfo[0].userInfo.visitCount += 1;
      siteInfo[0].save();
    }
  });
  if (req.session.user) {
    curUser = req.session.user;
    res.render('index', { title: '首页', user: curUser });
  } else {
    res.render('index', { title: '首页'});
  }
});
router.get('/explore/', function(req, res, next) {
  Couple.find({}, function(err, couples) {
    if (req.session.user) {
      curUser = req.session.user;
      res.render('explore', { title: '探索', couples: couples, user: curUser });
    } else {
      res.render('explore', { title: '探索', couples: couples});
    }
  });
});

// 浏览作品（全部及按id单个）
router.get('/couple/:coupleId/', function(req, res, next) {
  Couple.findOne({_id: req.params.coupleId}, function(err, couple) {
    if (req.session.user) {
      curUser = req.session.user;
      res.render('couple_detail', { title: couple.basicInfo.name, couple: couple, user: curUser });
    } else {
      res.render('couple_detail', { title: couple.basicInfo.name, couple: couple});
    }
  });
});

// 删除
router.get('/delete/:type/:id', function(req, res, next) {
  
});
module.exports = router;
