//<!--  WEN HAO FENG 301223017 -->
var express = require('express');
var url = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact/', { title: 'Express' });
});

router.post('/',function(req, res, next) {
  let formData = req.body;
  let redirectedUrl = url.format({
    pathname:'/contact/message',
    query: formData
  })
  res.redirect(redirectedUrl)
});

router.get('/message',function(req, res) {  
  res.render('contact/formsubmit',req.query);
});

module.exports = router;
