//<!--  WEN HAO FENG 301223017 -->
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var express = require('express');
var router = express.Router();
var auth = require('./auth');
var User = mongoose.model('User');


/* GET user. */
router.get('/',auth.required, function(req, res, next) {
  User.findById(req.playload.id).then(function(user) {
    if(!user) {
      return res.sendStatus(401);
    }
    return res.json({user: user.toAuthJSON()});
  }).catch(next)
});


/* SIGN UP */
router.post('/',function(req, res, next) {
  console.log(req.body);
  var user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.save().then(function() {
    return res.json({
      user:user.toAuthJSON()
    });
  }).catch(next);
});

/**
 * LOG IN
 */
 router.post('/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){
      console.log(err);
      return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

module.exports = router;
