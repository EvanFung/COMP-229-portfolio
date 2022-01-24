var express = require('express');
var router = express.Router();
const projects = require('../utils/projects');
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(projects);
  res.render('projects/', { title: 'Express', projects });
});

module.exports = router;
