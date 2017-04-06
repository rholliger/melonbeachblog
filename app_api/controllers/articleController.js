var utils = require('../libs/utils');
var Article = require('../models/articles');

function getArticleFromSlug(slug, res) {
  Article.findOne({ slug: slug }, function(err, article) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else if (!article) {
      utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding article found with this slug'
        });
    } else {
      utils.sendJSONResponse(res, 200, article);
    }
  });
}

function getArticlesFromCategory(category, res) {
  Article.find({ category: category }, function(err, article) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else if (!article) {
      utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding articles found with this category'
        });
    } else {
      utils.sendJSONResponse(res, 200, article);
    }
  });
}

module.exports.getArticles = function(req, res) {
  if (req.query && req.query.slug) {
    getArticleFromSlug(req.query.slug, res);
    return;
  }

  if (req.query && req.query.category) {
    getArticlesFromCategory(req.query.category, res);
    return;
  }

  Article.find({}).sort({createdDate: -1}).exec(function(err, articles) {
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

function createSlugFromTitle(title) {
  return title.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ä/, 'ae')
    .replace(/ö/, 'oe')
    .replace(/ü/, 'ue')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

module.exports.createArticle = function(req, res) {
  Article.create({
    title: req.body.title,
    slug: req.body.slug ? req.body.slug : createSlugFromTitle(req.body.title),
    // author: req.body.author,
    category: req.body.category,
    content: req.body.content
  }, function(err, article) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      // TODO: Location header? / Does the created article need to be returned in the body?
      // res.location = '/articles';
      res.setHeader('Location', '/articles');
      utils.sendJSONResponse(res, 201, null);
    }
  });
};

module.exports.updateArticle = function(req, res) {
  if (req.params && req.params.articleId) {
    Article.findByIdAndUpdate(req.params.articleId, {
      title: req.body.title,
      slug: req.body.slug,
      category: req.body.category,
      content: req.body.content
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