exports.showArticles = function(req, res) {
  res.render('index', { title: 'MelonBeach Blog' });
};

exports.showCategory = function(req, res) {
  console.log('category', req.params.categoryName);
  res.render('index', { title: 'MelonBeach Blog Category' });
};

exports.showArticle = function(req, res) {
  console.log('category -> ' + req.params.categoryName + ' articleSlug -> ' + req.params.articleSlug);
  res.render('index', { title: 'MelonBeach Blog Article' });
};

exports.showAbout = function(req, res) {
  res.render('index', { title: 'MelonBeach Blog About' });
};