var utils = require('../libs/utils');

module.exports.getMediaFiles = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    media: []
  });
};

module.exports.getMediaFile = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    media: {}
  });
};

module.exports.uploadMediaFile = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    media: {}
  });
};

module.exports.deleteMediaFile = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    message: 'Deleted media'
  });
};