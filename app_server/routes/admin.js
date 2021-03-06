var express = require('express');
var router = express.Router();
var config = require('../config');

var frontController = require('../controllers/admin/frontController');
var messageController = require('../controllers/admin/messageController');
var articlesController = require('../controllers/admin/articlesController');
var mediaController = require('../controllers/admin/mediaController');
var settingsController = require('../controllers/admin/settingsController');

// TODO: Better option to add this middleware?
function setNavigationData(req, res, next) {
  res.locals.navigation = {
    'articles': {
      name: 'Articles',
      url: '/admin/articles/',
      icon: 'edit'
    },
    'media': {
      name: 'Media',
      url: '/admin/media/',
      icon: 'picture'
    }
    // 'settings': {
    //   name: 'Settings',
    //   url: '/admin/settings/',
    //   icon: 'cog'
    // }
  };
  next();
}

function checkAuthentication(req, res, next) {
  if (req.cookies.jwtoken) {
    config.setAuthorizationHeader(req.cookies.jwtoken);
    next();
  } else {
    res.redirect('/admin/login/');
  }
}

// Login & Logout
router.get('/login', function(req, res) {
  res.render('admin/login', { title: 'This is the login' });
});

router.get('/logout', function(req, res) {
  res.clearCookie('jwtoken');
  res.redirect('/admin/login/');
});

// Every admin route should be authenticated first, to see if the user is logged in
router.get('/*', checkAuthentication);

// Front page (dashboard)
router.get('/', setNavigationData, frontController.showHomepage);

// Admin Article Routes
router.get('/articles', setNavigationData, articlesController.showArticleList);
router.get('/articles/create', setNavigationData, articlesController.showArticleCreation);
router.get('/articles/edit/:articleId', setNavigationData, articlesController.showArticleUpdate);
router.get('/articles/delete/:articleId', setNavigationData, articlesController.deleteArticle);

// Admin Media Routes
router.get('/media', setNavigationData, mediaController.showMediaList);
router.get('/media/upload', setNavigationData, mediaController.showMediaUpload);
router.get('/media/create', setNavigationData, mediaController.showMediaCreation);
router.get('/media/edit/:mediaId', setNavigationData, mediaController.showMediaUpdate);
router.get('/media/delete/:mediaId', setNavigationData, mediaController.deleteMedia);

router.get('/toast/:view/:statusCode', messageController.showToastMessage);

// Settings
router.get('/settings', setNavigationData, settingsController.showSettings);

// // TODO: Not found
// router.get('*', function(req, res) {
// })

module.exports = router;