module.exports.showHomepage = function(req, res) {
  console.log('front controller');
  res.render('admin/index', { title: 'MelonBeach Blog Admin' });
};