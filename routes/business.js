/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 22:37:20 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-14 01:58:30
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('business/');
});





module.exports = router;
