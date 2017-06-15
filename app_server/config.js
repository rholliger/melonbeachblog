var request = require('request');

module.exports = {
  apiUrl: (process.env.NODE_ENV === 'production') ? 'http://139.59.146.243:3000/api' : 'http://localhost:3000/api'
};

var authenticatedRequest;

module.exports.setAuthorizationHeader = function(token) {
  authenticatedRequest = request.defaults({
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}

module.exports.getAuthenticatedRequest = function() {
  return authenticatedRequest;
}
