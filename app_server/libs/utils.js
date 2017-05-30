var moment = require('moment');

module.exports.apiOptions = {
  // serverUrl: 'http://localhost:3000/api'
  serverUrl: 'http://139.59.146.243:3000/api'
};

module.exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.formatDate = function(date, format) {
  var dateFormat = format ? format : 'DD. MMMM YYYY';
  return moment(date).format(dateFormat);
}

module.exports.createExcerpt = function(text, charLength) {
  if (text.length >= charLength) {
    return text.substr(0, charLength) + '...';
  }
  return text;
}