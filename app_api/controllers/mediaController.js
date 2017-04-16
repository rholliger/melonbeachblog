var fs = require('fs');
var multer = require('multer');
var utils = require('../libs/utils');
var Media = require('../models/media').Model;

// Multer configuration
var uploadDestination = './public/uploads/'

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDestination);
  },
  filename: function(req, file, cb) {
    var name = file.originalname.split('.')[0];
    cb(null, name + '-' + Date.now())
  }
});

var upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10000000 // Limited file size to 10MB
  }
}).single('mediaUpload');


module.exports.getMediaFiles = function(req, res) {
  Media.find({}, function(err, articles) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      utils.sendJSONResponse(res, 200, articles);
    }
  });
};

module.exports.getMediaFile = function(req, res) {
  if (req.params && req.params.mediaId) {
    Media.findById(req.params.mediaId, function(err, media) {
      if (err) {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });  
      } else if (!media) {
        utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding media file found with this mediaId'
        });
      } else {
        utils.sendJSONResponse(res, 200, media);
      }
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      'message': 'No mediaId found in request'
    });
  }
};

module.exports.uploadMediaFile = function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
      return;
    } else {
      Media.create({
        fileName: req.file.filename,
        mimeType: req.file.mimetype
      }, function(err, media) {
        if (err) {
          // Delete the uploaded media file from the filesystem if a database error occured
          fs.unlink(uploadDestination + req.file.filename, function(err) {
            if (err) throw err;
          });
          utils.sendJSONResponse(res, 400, {
            'message': err
          });
        } else {
          utils.sendJSONResponse(res, 201, media);
        }
      });
    }
  });
};

module.exports.editMediaFile = function(req, res) {
  if (req.params && req.params.mediaId) {
    Media.findByIdAndUpdate(req.params.mediaId, {
      name: req.body.name,
      description: req.body.description
    }, function(err, media) {
      if (err) {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });
      } else if (!media) {
        utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding media found with this mediaId'
        });
      } else {
        utils.sendJSONResponse(res, 200, media);
      }
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      'message': 'No mediaId found in request'
    });
  }
};

module.exports.deleteMediaFile = function(req, res) {
  if (req.params && req.params.mediaId) {
    Media.findByIdAndRemove(req.params.mediaId, function(err, media) {
      if (err) {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });
      } else if (!media) {
        utils.sendJSONResponse(res, 404, {
          'message': 'No corresponding media file found with this mediaId'
        });
      } else {
        // Also delete the media file on the server
        fs.unlink(uploadDestination + media.fileName, function(err) {
          if (err) throw err;
        });
        utils.sendJSONResponse(res, 204, null);
      }
    });
  } else {
    utils.sendJSONResponse(res, 404, {
      'message': 'No mediaId found in request'
    });
  }
};