var request = require('request');
var utils = require('../../libs/utils');

var apiOptions = {
  serverUrl: 'http://localhost:3000/api'
};

function getCategories() {
  return new Promise((resolve, reject) => {
    request({
      url: apiOptions.serverUrl + '/categories',
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
    url: apiOptions.serverUrl + '/articles',
    method: 'GET',
    json: {}
  }, function(err, response, body) {
    for (data of body) {
      data.category = utils.capitalize(data.category);
      data.createdDate = utils.formatDate(data.createdDate, 'DD.MM.YYYY HH:MM');
      data.content = utils.createExcerpt(data.content, 100);
    }

    res.render('admin/articles/list', { 
      title: 'MelonBeach Blog Article Creation',
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
  console.log(getCategories());

  request({
    url: apiOptions.serverUrl + '/articles/' + req.params.articleId,
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
  request({
    url: apiOptions.serverUrl + '/articles/' + req.params.articleId,
    method: 'DELETE',
  }, function(err, response, body) {
    res.redirect('/admin/articles');
  });
};