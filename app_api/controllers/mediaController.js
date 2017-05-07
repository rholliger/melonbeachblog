var fs = require('fs');
var multer = require('multer');
var flash = require('connect-flash');
var appUtils = require('../../appUtils');
var utils = require('../libs/utils');
var Media = require('../models/media').Model;

// Multer configuration
var uploadDestination = './public/uploads/'

// Regular expression for checking the mime types
const ALLOWED_MIMETYPES = /(image\/(jpe?g|png|gif))|(video\/(mp4|quicktime|ogg|x-msvideo|avi|mpeg|webm))|(application\/pdf)/g

// Own specific error for detecting if the client sent an unsupported media type (mime-type) to the server
function WrongMediaTypeError(message) {
  this.name = 'WrongMediaTypeError';
  this.message = message || 'This media type is not allowed';
  this.stack = (new Error()).stack;
}
WrongMediaTypeError.prototype = Object.create(Error.prototype);
WrongMediaTypeError.prototype.constructor = WrongMediaTypeError;

// This file filter checks if the client sent an allowed mime type
var fileFilter = function(req, file, cb) {
  if (file.mimetype.match(ALLOWED_MIMETYPES)) {
    console.log(file);
    cb(null, true);
  } else {
    return cb(new WrongMediaTypeError(), false);
  }
}

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
    fileSize: 40000000 // Limited file size to 40MB
  },
  fileFilter: fileFilter
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
      if (err instanceof WrongMediaTypeError) {
        utils.sendJSONResponse(res, 415, { // 415 - Unsupported Media Type correct here? Or is it a 422 Unprocessable Entity?
          'message': err.message
        });
      } else {
        utils.sendJSONResponse(res, 400, {
          'message': err
        });
      }
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
          appUtils.setToastMessage(req, 'success', 'The media file was uploaded successfully!');
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