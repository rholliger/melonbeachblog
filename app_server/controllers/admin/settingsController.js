// Show all articles from the database and present them in the article list view
exports.showSettings = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Settings' });
};