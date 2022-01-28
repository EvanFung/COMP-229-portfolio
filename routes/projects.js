//<!--  WEN HAO FENG 301223017 -->

var express = require('express');
var router = express.Router();
const projects = require('../utils/projects');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('projects/', { title: 'Express', projects });
});

module.exports = router;
