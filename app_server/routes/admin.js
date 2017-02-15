var express = require('express');
var router = express.Router();

var frontController = require('../controllers/admin/frontController');
var articlesController = require('../controllers/admin/articlesController');
var mediaController = require('../controllers/admin/mediaController');
var settingsController = require('../controllers/admin/settingsController');

// Front page (dashboard)
router.get('/', frontController.showHomepage);

// Admin Article Routes
router.get('/articles', articlesController.showArticleList);
router.get('/articles/create', articlesController.showArticleCreation);
router.get('/articles/edit/:articleId', articlesController.showArticleUpdate);
router.get('/articles/delete/:articleId', articlesController.deleteArticle);

// Admin Media Routes
router.get('/media', mediaController.showMediaList);
router.get('/media/create', mediaController.showMediaCreation);
router.get('/media/delete/:mediaId', mediaController.deleteMedia);

// Settings
router.get('/settings', settingsController.showSettings);

module.exports = router;