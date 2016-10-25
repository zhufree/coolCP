var express = require('express');
var router = express.Router();
var Site = require('../models/siteModel');

var query = Site.find({});
/*
一级路由导航
首页/发现/动态/创建新cp/作品
*/
router.get('/', function(req, res, next) {
  console.log(req.session);
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

module.exports = router;
