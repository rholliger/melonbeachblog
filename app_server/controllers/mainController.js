var request = require('request');
var moment = require('moment');
var utils = require('../libs/utils');

var apiOptions = {
  serverUrl: 'http://localhost:3000/api'
};

function requestArticles(path, callback) {
  request({
    url: apiOptions.serverUrl + '/articles' + path,
    method: 'GET',
    json: {}
  }, function(err, response, body) {
    if (Array.isArray(body)) {
      for (data of body) {
        data.content = utils.createExcerpt(data.content, 600);
        data.createdDate = utils.formatDate(data.createdDate);
        if (data.mediaElement) {
          console.log('blublu', data.mediaElement.mediaFile.fileName);
        }
      }
    } else {
      body.createdDate = utils.formatDate(body.createdDate);
    }
    callback(body, err);
  });
}

module.exports.showArticles = function(req, res) {
  requestArticles('', function(body, err) {
      res.render('index', {
        title: 'MelonBeach Blog Home',
        articles: body
      });    
  });
};

module.exports.showCategory = function(req, res) {
  requestArticles('?category=' + req.params.categoryName, function(body, err) {
    res.render('index', {
      title: 'MelonBeach Blog / ' + utils.capitalize(req.params.categoryName),
      articles: body
    });
  });
};

module.exports.showArticle = function(req, res) {
  requestArticles('?slug=' + req.params.articleSlug, function(body, err) {
    res.render('article', {
      title: body.title,
      article: body
    });
  });
};

module.exports.showAbout = function(req, res) {
  res.render('index', { title: 'MelonBeach Blog About' });
};