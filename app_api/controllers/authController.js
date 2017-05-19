var utils = require('../libs/utils');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/users');

module.exports.register = function(req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    utils.sendJSONResponse(res, 400, {
      'message': 'All fields required'
    });
    return;
  }

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    if (err) {
      utils.sendJSONResponse(res, 404, err);
    } else {
      token = user.generateJwt();
      utils.sendJSONResponse(res, 200, {
        'token': token
      });
    }
  });
};

module.exports.login = function(req, res) {
  if (!req.body.email || !req.body.password) {
    utils.sendJSONResponse(res, 400, {
      'message': 'All fields required'
    });
    return;
  }

  passport.authenticate('local', function(err, user, info) {
    var token;

    if (err) {
      utils.sendJSONResponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      utils.sendJSONResponse(res, 200, {
        'token': token
      });
    } else {
      utils.sendJSONResponse(res, 401, info);
    }
  })(req, res);
};