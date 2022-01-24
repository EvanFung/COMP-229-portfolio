var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('projects/', { title: 'Express' });
});

module.exports = router;
