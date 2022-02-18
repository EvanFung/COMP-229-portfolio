/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 22:37:20 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-17 21:07:34
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
  console.log(req.body);
  var businessContact = {
    name:req.body.name,
    email:req.body.email,
    number:req.body.number,
  };
  BusinessContact.findByIdAndUpdate(req.params.id,businessContact, function(err, updatedBc) {
    if(err) {
      console.log(err);
    }
  });
  res.redirect('/business');
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
router.get('/',  async function (req, res, next) {
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

  var bcList = await BusinessContact.find().limit(Number(limit)).skip(Number(offset)).exec();
  var pages = Math.ceil(bcList.length/limit);
  return res.render('business/',{
    bcList,
    offset,
    limit,
    pages,
    currentPage
  });

});
//DELETE 
router.delete('/:id/delete', function (req, res, next) {
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
