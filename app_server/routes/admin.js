var express = require('express');
var router = express.Router();

var frontController = require('../controllers/admin/frontController');

console.log('admin frontController');

/* GET home page. */
router.get('/', frontController.showHomepage);

module.exports = router;