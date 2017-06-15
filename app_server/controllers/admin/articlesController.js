var request = require('request');
var config = require('../../config');
var utils = require('../../libs/utils');

function getCategories() {
  return new Promise((resolve, reject) => {
    request({
      url: config.apiUrl + '/categories',
      method: 'GET',
      json: {}
    }, function(err, response, body) {
      if (!err && body) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  });
}

// Show all articles from the database and present them in the article list view
module.exports.showArticleList = function(req, res) {
  request({
    url: config.apiUrl + '/articles',
    method: 'GET',
    json: {}
  }, function(err, response, body) {
    for (data of body) {
      data.category = utils.capitalize(data.category);
      data.createdDate = utils.formatDate(data.createdDate, 'DD.MM.YYYY hh:mm');
      data.content = utils.createExcerpt(data.content, 100);
    }

    res.render('admin/articles/list', { 
      title: 'MelonBeach Blog Article List',
      type: 'articles',
      articles: body
    });
  });
};

// Show the article creation view
module.exports.showArticleCreation = function(req, res) {
  // Get all categories for the category selection
  getCategories().then((body) => {
    res.render('admin/articles/create', { 
      title: 'MelonBeach Blog Article Creation',
      type: 'articles',
      categories: body
    });
  });

  // TODO: Errorhandling
};

// Show the article edit view
module.exports.showArticleUpdate = function(req, res) {
  request({
    url: config.apiUrl + '/articles/' + req.params.articleId,
    method: 'GET',
    json: {}
  }, function(err, response, body) {
    var article = body;
    article.category = utils.capitalize(article.category);

    getCategories().then((body) => {
      res.render('admin/articles/edit', { 
        title: 'MelonBeach Blog Article Creation',
        type: 'articles',
        article: article,
        categories: body
      });

      // TODO: Errorhandling
    });
  });
};

// Show the deletion of an article
module.exports.deleteArticle = function(req, res) {
  request = config.getAuthenticatedRequest();
  request({
    url: config.apiUrl + '/articles/' + req.params.articleId,
    method: 'DELETE',
  }, function(err, response, body) {
    res.redirect('/admin/articles/');
  });
};