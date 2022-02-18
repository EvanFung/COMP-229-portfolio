/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 22:37:20 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-17 22:49:52
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
const BusinessContact = require('../models/BusinessContact');
/* GET users listing. */
// router.get('/', middleware.isLoggedIn, function (req, res, next) {
//   res.render('business/');
// });
//Create business contact
router.post('/',middleware.isLoggedIn,function (req, res, next) {

  var newBusiness = {
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
  };
  BusinessContact.create(newBusiness,function(err, data) {
    if(err) {
      console.log(err);
      req.flash('error', err.name);
      res.redirect('back');
    } else {
      req.flash('success', 'business contact added');
      res.redirect('/business');
    }
  });

});
//Update business contact
router.put('/:id',middleware.isLoggedIn, function (req, res, next) {
  console.log("hello world");
  console.log(req.params.id);
  console.log(req.body);
  var businessContact = {
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
  };
  BusinessContact.findByIdAndUpdate(req.params.id,businessContact, function(err, updatedBc) {
    if(err) {
      console.log(err);
      req.flash('error', 'something went wrong');
      res.redirect('back');
    }
  });
  req.flash('success', 'business contact updated');
  res.redirect('/business');
});

router.get('/:id/edit',middleware.isLoggedIn,function(req, res) {
  BusinessContact.findById(req.params.id,function(err, bc) {
    if(err) {
      console.log(err);
      req.flash('error', 'something went wrong');
      res.redirect('back');
    }
    res.render('business/edit',{businesscontact: bc});
  });
});

//List
router.get('/',middleware.isLoggedIn,  async function (req, res, next) {
  var limit = 10;
  //offset = (page - 1) * itemsPerPage + 1
  var offset = 0;
  var currentPage = 1;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  if (typeof req.query.currentPage !== 'undefined') {
    currentPage = req.query.currentPage;
  }

  if(offset <0 || limit < 10 || currentPage < 1) {
    req.flash('error', 'something went wrong');
    res.redirect('back');
  }

  var total = await BusinessContact.count();

  var bcList = await BusinessContact.find().limit(Number(limit)).skip(Number(offset)).exec();
  var pages = Math.ceil(total/limit);
  return res.render('business/',{
    bcList,
    offset,
    limit,
    pages,
    currentPage
  });

});
//DELETE 
router.get('/:id/delete',middleware.isLoggedIn, function (req, res, next) {
  BusinessContact.findByIdAndRemove(req.params.id, function (err) {
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
