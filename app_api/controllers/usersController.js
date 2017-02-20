var utils = require('../libs/utils');

module.exports.getUsers = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    users: []
  });
};

module.exports.getUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    user: {}
  });
};

module.exports.createUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    user: {}
  });
};

module.exports.updateUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    user: {}
  });
};

module.exports.deleteUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    message: 'Deleted user'
  });
};