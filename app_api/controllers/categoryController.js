var utils = require('../libs/utils');
var Category = require('../models/category');

module.exports.getCategories = function(req, res) {
  Category.find({}, function(err, categories) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      utils.sendJSONResponse(res, 200, categories);
    }
  });
}

module.exports.createCategory = function(req, res) {
  Category.create({ name: req.body.name }, function(err) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      // TODO: Location header? / Does the created category need to be returned in the body?
      // res.location = '/categories';
      res.setHeader('Location', '/categories');
      utils.sendJSONResponse(res, 201, null);
    }
  });
}

module.exports.deleteCategory = function(req, res) {
  Category.findByIdAndRemove(req.params.categoryId, function(err) {
    if (err) {
      utils.sendJSONResponse(res, 400, {
        'message': err
      });
    } else {
      utils.sendJSONResponse(res, 204, null);
    }
  });
}