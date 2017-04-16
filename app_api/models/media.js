var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
  name: String,
  description: String,
  createdDate: {
    type: Date,
    'default': Date.now
  },
  fileName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  type: {
    type: String,
    // Enum?
    // enum: ['Image', 'Video', ...]
  },
  url: String
});

// TODO: Better syntax?
module.exports.mediaSchema = mediaSchema;
module.exports.Model = mongoose.model('Media', mediaSchema);