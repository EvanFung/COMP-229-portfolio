//<!--  WEN HAO FENG 301223017 -->

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('aboutme/', { title: 'Express' });
});

module.exports = router;
