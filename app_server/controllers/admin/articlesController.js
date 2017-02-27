var request = require('request');

var apiOptions = {
  serverUrl: 'http://localhost:3000/api'
};

// Show all articles from the database and present them in the article list view
module.exports.showArticleList = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Article List' });
};

// Show the article creation view
module.exports.showArticleCreation = function(req, res) {
  // Get all categories for the category selection
  request({
    url: apiOptions.serverUrl + '/categories',
    method: 'GET',
    json: {}
  }, function(err, response, body) {
    res.render('admin/create', { 
      title: 'MelonBeach Blog Article Creation',
      type: 'articles',
      categories: body
    });
  });
};

// Show the article edit view
module.exports.showArticleUpdate = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Article Creation' }); 
};

// Show the deletion of an article
module.exports.deleteArticle = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Article Deletion' }); 
};