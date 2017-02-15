var utils = require('../utils');

exports.getUsers = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    users: []
  });
};

exports.getUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    user: {}
  });
};

exports.createUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    user: {}
  });
};

exports.updateUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    user: {}
  });
};

exports.deleteUser = function(req, res) {
  utils.sendJSONResponse(res, 200, {
    message: 'Deleted user'
  });
};