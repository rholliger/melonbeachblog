module.exports.showArticles = function(req, res) {
  res.render('index', {
    title: 'MelonBeach Blog',
    articles: [{
      title: 'First title'
    }, {
      title: 'Second title'
    }]
  });
};

module.exports.showCategory = function(req, res) {
  console.log('category', req.params.categoryName);
  res.render('index', { title: 'MelonBeach Blog Category' });
};

module.exports.showArticle = function(req, res) {
  console.log('category -> ' + req.params.categoryName + ' articleSlug -> ' + req.params.articleSlug);
  res.render('article', {
    title: 'MelonBeach Blog Article',
    article: {
      title: 'This is my article'
    }
  });
};

module.exports.showAbout = function(req, res) {
  res.render('index', { title: 'MelonBeach Blog About' });
};