var request = require('request');

var apiOptions = {
  serverUrl: 'http://localhost:3000'
};

function createContentExcerpt(content) {
  return content.substr(0, 600) + '...';
}

module.exports.showArticles = function(req, res) {
  request({
    url: apiOptions.serverUrl + '/api/articles',
    method: 'GET',
    json: {}
  }, function(error, response, body) {
    for (data of body) {
      if (data.content.length > 600) {
        data.content = createContentExcerpt(data.content);
      }
    }

    res.render('index', {
      title: 'MelonBeach Blog',
      articles: body
    });
  });
};

module.exports.showCategory = function(req, res) {
  request({
    url: apiOptions.serverUrl + '/api/articles?category=' + req.params.categoryName,
    method: 'GET',
    json: {}
  }, function(error, response, body) {
    for (data of body) {
      if (data.content.length > 600) {
        data.content = createContentExcerpt(data.content);
      }
    }

    res.render('index', {
      title: 'MelonBeach Blog Article' + req.params.categoryName,
      articles: body
    });
  });
};

module.exports.showArticle = function(req, res) {
  request({
    url: apiOptions.serverUrl + '/api/articles?slug=' + req.params.articleSlug,
    method: 'GET',
    json: {}
  }, function(error, response, body) {
    res.render('article', {
      title: 'MelonBeach Blog Article',
      article: body
    });
  });
};

module.exports.showAbout = function(req, res) {
  res.render('index', { title: 'MelonBeach Blog About' });
};