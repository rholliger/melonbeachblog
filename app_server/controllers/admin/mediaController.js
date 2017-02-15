// Show all media files from the file system and present them in the article list view
exports.showMediaList = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Media List' });
};

// Show the media creation view
exports.showMediaCreation = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Media Creation' }); 
};

// Show the deletion of an media
exports.deleteMedia = function(req, res) {
  res.render('admin/index', { title: 'MelonBeach Blog Media Deletion' }); 
};