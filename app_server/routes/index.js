var express = require('express');
var router = express.Router();

var mainController = require('../controllers/mainController');

// About page
router.get('/about', mainController.showAbout);

// Article and categories
router.get('/', mainController.showArticles);
router.get('/:categoryName', mainController.showCategory);
router.get('/:categoryName/:articleSlug', mainController.showArticle);

module.exports = router;