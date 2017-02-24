// Show all media files from the file system and present them in the article list view
module.exports.showMediaList = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Media List' });
};

// Show the media creation view
module.exports.showMediaCreation = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Media Creation' }); 
};

// Show the deletion of an media
module.exports.deleteMedia = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Media Deletion' }); 
};