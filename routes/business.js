/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 22:37:20 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-17 16:32:34
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
const BusinessContact = require('../models/BusinessContact');
/* GET users listing. */
router.get('/', middleware.isLoggedIn, function (req, res, next) {
  res.render('business/');
});
//Create business contact
router.post('/',function (req, res, next) {

  var newBusiness = {
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
  };
  BusinessContact.create(newBusiness,function(err, data) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/business');
    }
  });

});
//Update business contact
router.put('/:id', function (req, res, next) {
  console.log("hello world");
  console.log(req.params.id);
  console.log(req.body.businessContact);
  BusinessContact.findByIdAndUpdate(req.params.id,req.body.businessContact, function(err, updatedBc) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/business/'+req.params.id);
    }
  });
  res.json({
    hello:"world"
  });
});

router.get('/:id/edit',function(req, res) {
  BusinessContact.findById(req.params.id,function(err, bc) {
    if(err) {
      console.log(err);
    }
    res.render('business/edit',{businesscontact: bc});
  });
});

//List
router.get('/list',  async function (req, res, next) {
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  var bcList = await BusinessContact.find().limit(Number(limit)).skip(Number(offset)).exec();

  return res.json({
    list: bcList
  });

});
//DELETE 
router.delete('/:businesscontact_id', middleware.isLoggedIn, function (req, res, next) {
  BusinessContact.findByIdAndRemove(req.params.businesscontact_id, function (err) {
    if (err) {
      req.flash('error', 'something went wrong');
      res.redirect('back');
    } else {
      req.flash('success', 'business contact deleted');
      res.redirect('/business');
    }
  });
});

module.exports = router;
