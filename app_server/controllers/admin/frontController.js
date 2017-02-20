module.exports.showHomepage = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Admin' });
};