var utils = require('../libs/utils');
var Article = require('../models/articles');

module.exports.getArticles = function(req, res) {
  Article.find({}, function(err, articles) {
    if (err) {
      utils.sendJSONResponse(res, 404, {
        'message': err
      });
    }
    utils.sendJSONResponse(res, 200, articles);
  });
};

module.exports.getArticle = function(req, res) {
  Article.findById(req.params.articleId, function(err, article) {
    if (err) {
      utils.sendJSONResponse(res, 404, {
        'message': err
      });  
    }
    utils.sendJSONResponse(res, 200, article);
  });
};

module.exports.createArticle = function(req, res) {
  Article.create({
    title: req.body.title,
    slug: req.body.slug,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content
  }, function(err, article) {
    if (err) {
      utils.sendJSONResponse(res, 404, {
        'message': err
      });
    }
    utils.sendJSONResponse(res, 200, article);
  });
};

module.exports.updateArticle = function(req, res) {
  Article.findByIdAndUpdate(req.params.articleId, {
    title: 'Dieser Artikel ist geupdated worden'
  }, function(err, article) {
    if (err) {
      utils.sendJSONResponse(res, 200, {
        'message': err
      });
    }
    utils.sendJSONResponse(res, 200, article);
  });
};

module.exports.deleteArticle = function(req, res) {
  Article.findByIdAndRemove(req.params.articleId, function(err) {
    if (err) {
      utils.sendJSONResponse(res, 200, {
        'message': err
      });
    }
    utils.sendJSONResponse(res, 204, null);
  });
};