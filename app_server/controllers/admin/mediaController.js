var util = require('util');
var request = require('request');
var config = require('../../config');
var appUtils = require('../../../appUtils');
var utils = require('../../libs/utils');

// Show all media files from the file system and present them in the article list view
module.exports.showMediaList = function(req, res) {
  request({
    url: config.apiUrl + '/media',
    method: 'GET',
    json: {}
  }, function(err, response, body) {
    for (data of body) {
      data.createdDate = utils.formatDate(data.createdDate, 'DD.MM.YYYY hh:mm');
    }

    res.render('admin/media/list', { 
      title: 'MelonBeach Blog Article asdasd',
      type: 'media',
      media: body,
      alertMessage: appUtils.getToastMessage(req)
    });
  });
};

// Show the media upload view
module.exports.showMediaUpload = function(req, res) {
  res.render('admin/media/upload', {
    title: 'MelonBeach Blog Media Upload',
    type: 'media'
  });
}

// Show the media creation view
module.exports.showMediaCreation = function(req, res) {
  res.render('admin/media/create', {
    title: 'MelonBeach Blog Media Creation',
    type: 'media'
  });
};

// Show the media update view
module.exports.showMediaUpdate = function(req, res) {
  res.render('admin/media/edit', {
    title: 'MelonBeach Blog Media Update',
    type: 'media'
  });
};

// Show the deletion of an media
module.exports.deleteMedia = function(req, res) {
  request = config.getAuthenticatedRequest();
  request({
    url: config.apiUrl + '/media/' + req.params.mediaId,
    method: 'DELETE',
  }, function(err, response, body) {
    if (response.statusCode === 204) {
      appUtils.setToastMessage(req, 'success', 'The media file was deleted successfully!');
    }
    res.redirect('/admin/media/');
  });
};
