var express = require('express');
var router = express.Router();

var articleController = require('../controllers/articleController');
var mediaController = require('../controllers/mediaController');
var usersController = require('../controllers/usersController');

/* ==== Articles ==== */

// Get all articles
router.get('/articles', articleController.getArticles);

// Get a specific article via article ID
router.get('/articles/:articleId', articleController.getArticle);

// Create a new article
router.post('/articles', articleController.createArticle);

// Update an article via article ID
router.put('/articles/:articleId', articleController.updateArticle);

// Delete an article via article ID
router.delete('/articles/:articleId', articleController.deleteArticle);

/* ======== */

/* ==== Media ==== */

// Get all media files
router.get('/media', mediaController.getMediaFiles);

// Get a specific media file via media ID
router.get('/media/:mediaId', mediaController.getMediaFile);

// Create / upload a new media file
router.post('/media', mediaController.uploadMediaFile);

// Delete a media file via media ID
router.delete('/media/:mediaId', mediaController.deleteMediaFile);

/* ======== */

/* ==== Media ==== */

// Get all users
router.get('/users', usersController.getUsers);

// Get a specific user via user ID
router.get('/users/:userId', usersController.getUser);

// Create a new user
router.post('/users', usersController.createUser);

// Update a user via user ID
router.put('/users/:userId', usersController.updateUser);

// Delete a user via user ID
router.delete('/users/:userId', usersController.deleteUser);

/* ======== */

module.exports = router;