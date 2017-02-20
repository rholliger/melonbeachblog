var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
  name: {
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
module.exports.model = mongoose.model('Media', mediaSchema);