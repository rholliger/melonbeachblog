var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var articleController = require('../controllers/articleController');
var mediaController = require('../controllers/mediaController');
var usersController = require('../controllers/usersController');
var categoryController = require('../controllers/categoryController');
var authController = require('../controllers/authController');

/* ==== Articles ==== */

// Get all articles
router.get('/articles', articleController.getArticles);

// Get a specific article via article ID
router.get('/articles/:articleId', articleController.getArticle);

// Create a new article
router.post('/articles', auth, articleController.createArticle);

// Update an article via article ID
router.put('/articles/:articleId', auth, articleController.updateArticle);

// Delete an article via article ID
router.delete('/articles/:articleId', auth, articleController.deleteArticle);

// Test for active state
router.put('/articles/:articleId/active', auth, articleController.setActiveState);

/* ======== */

/* ==== Categories ==== */

// Get all categories
router.get('/categories', categoryController.getCategories);

// Create a new category
router.post('/categories', auth, categoryController.createCategory);

// TODO: Do we need to change a category? (It only has a name)
// router.put...

// Delete a category via category ID
router.delete('/categories/:categoryId', auth, categoryController.deleteCategory);

/* ======== */

/* ==== Media ==== */

// Get all media files
router.get('/media', mediaController.getMediaFiles);

// Get a specific media file via media ID
router.get('/media/:mediaId', mediaController.getMediaFile);

// Create / upload a new media file
router.post('/media', auth, mediaController.uploadMediaFile);

// Edit the media file
router.put('/media/:mediaId', auth, mediaController.editMediaFile);

// Delete a media file via media ID
router.delete('/media/:mediaId', auth, mediaController.deleteMediaFile);

/* ======== */

/* ==== Users ==== 

// TODO: User Management

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

/* ==== Authentication ==== */

// Register a user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

/* ======== */

module.exports = router;