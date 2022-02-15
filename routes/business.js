/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 22:37:20 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-15 00:59:23
 */
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
const BusinessContact = mongoose.model('BusinessContact');
/* GET users listing. */
router.get('/', middleware.isLoggedIn, function (req, res, next) {
  res.render('business/');
});
//Create business contact
router.post('/', middleware.isLoggedIn, function (req, res, next) {
  var businessContact = new BusinessContact();
  businessContact.name = req.body.name;
  businessContact.email = req.body.email;
  businessContact.number = req.body.number;

  businessContact.save(function (err, data) {
    return res.json({ businessContact: data });
  }).catch(next);
});
//Update business contact
router.put('/', middleware.isLoggedIn, function (req, res, next) {
  BusinessContact.findById(req.body.id).then(function (bc) {
    if (!bc) {
      req.flash('error', 'something went wrong');
      res.redirect('back');
    }
    return res.json({ businessContact: bc });
  }).catch(next);
});
//List
router.get('/list', middleware.isLoggedIn, async function (req, res, next) {
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
