var express = require('express');
var url = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact/', { title: 'Express' });
});

router.post('/',function(req, res, next) {
  console.log(req);
  let formData = req.body;
  let redirectedUrl = url.format({
    pathname:'/contact/message',
    query: formData
  })
  res.redirect(redirectedUrl)
});

router.get('/message',function(req, res) {
  console.log(req.query);
  
  res.render('contact/formsubmit',req.query);
});

module.exports = router;
