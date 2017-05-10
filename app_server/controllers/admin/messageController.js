var appUtils = require('../../../appUtils');

module.exports.showToastMessage = function(req, res) {
  if (req.params && req.params.statusCode) {
    appUtils.setToastMessage(req, req.params.statusCode, 'Hello dankness my old friend. Status code ('+req.params.statusCode+')');
    res.redirect('/admin/'+req.params.view+'/');
  }
};