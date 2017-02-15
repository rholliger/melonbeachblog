var utils = require('../utils');

exports.getArticles = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    articles: []
  });
};

exports.getArticle = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    article: {}
  });
};

exports.createArticle = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    article: {}
  });
};

exports.updateArticle = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    article: {}
  });
};

exports.deleteArticle = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    message: 'Deleted article'
  });
};