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
var Role = require('../models/roleModel');
var Origin = require('../models/originModel');

router.get('/', function(req, res, next) {
  //jump to account/user_id/
  res.send('respond with a resource');
});
router.get('/create/', function(req, res, next) {
  //jump to account/user_id/
  var curUser;
  if (req.session.user) {
    curUser = req.session.user;
  } else {
    req.session.refer = '/couple/create';
    res.redirect('/accounts/login/');
  }
  res.render('workSystem/createCouple', { title: '首页', user: curUser });
});

router.post('/create/', function(req, res, next) {
  // 验证是否登陆
  if (!req.session.user) {
    res.redirect('/accounts/login/');
  }

  var newCouple = new Couple({
    basicInfo: {
      name: req.body.name,
      // coverImage: req.body.coverImageUrl,
      roles: [],
      froms: [],
    },
    workInfo: {
      pictures: [],
      videos: [],
      articles: []
    },
    otherInfo: {
      tags: [],
      visitCount: 0,
      likeCount: 0
    }
  });
  newCouple.save();

  // 根据标签创建或查询role和from
  Origin.getOrCreate(req.body.role_1_from, '电视剧', function(origin) {
    newCouple.basicInfo.froms.push(origin);
    Role.getOrCreate(req.body.role_1_name, origin, function(role) {
      newCouple.basicInfo.roles.push(role);
      Origin.getOrCreate(req.body.role_2_from, '电视剧', function(origin) {
        newCouple.basicInfo.from.push(origin);
        Role.getOrCreate(req.body.role_2_name, origin, function(role) {
          newCouple.basicInfo.roles.push(role);
          newCouple.save();
        });
      });
    });
  });

  res.redirect('.');
});
module.exports = router;
