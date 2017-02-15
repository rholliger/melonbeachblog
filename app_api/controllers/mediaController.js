var utils = require('../utils');

exports.getMediaFiles = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    media: []
  });
};

exports.getMediaFile = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    media: {}
  });
};

exports.uploadMediaFile = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    media: {}
  });
};

exports.deleteMediaFile = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    message: 'Deleted media'
  });
};