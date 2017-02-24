var utils = require('../libs/utils');
var Article = require('../models/articles');

module.exports.getArticles = function(req, res) {
  Article.find({}, function(err, articles) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      utils.sendJSONResponse(res, 200, articles);
    }
  });
};

module.exports.getArticle = function(req, res) {
  if (req.params && req.params.articleId) {
    Article.findById(req.params.articleId, function(err, article) {
      if (err) {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });  
      } else if (!article) {
        utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding article found with this articleId'
        });
      } else {
        utils.sendJSONResponse(res, 200, article);
      }
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      'message': 'No articleId found in request'
    });
  }
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
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      // TODO: Location header? / Does the created article need to be returned in the body?
      utils.sendJSONResponse(res, 201, article);
    }
  });
};

module.exports.updateArticle = function(req, res) {
  if (req.params && req.params.articleId) {
    Article.findByIdAndUpdate(req.params.articleId, {
      title: 'Dieser Artikel ist geupdated worden'
    }, function(err, article) {
      if (err) {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });
      } else if (!article) {
        utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding article found with this articleId'
        });
      } else {
        utils.sendJSONResponse(res, 200, article);
      }
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      'message': 'No articleId found in request'
    });
  }
};

module.exports.deleteArticle = function(req, res) {
  if (req.params && req.params.articleId) {
    Article.findByIdAndRemove(req.params.articleId, function(err, article) {
      if (err) {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });
      } else if (!article) {
        utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding article found with this articleId'
        });
      } else {
        utils.sendJSONResponse(res, 204, null);
      }
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      'message': 'No articleId found in request'
    });
  }
};