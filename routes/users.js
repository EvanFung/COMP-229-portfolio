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
// router.post('/',function(req, res, next) {
//   console.log(req.body);
//   var user = new User();
//   user.username = req.body.user.username;
//   user.email = req.body.user.email;
//   user.setPassword(req.body.user.password);
//   user.save().then(function() {
//     return res.json({
//       user:user.toAuthJSON()
//     });
//   }).catch(next);
// });


router.post('/register',(req, res, next) => {
  User.register(new User({username:req.body.username,email:req.body.email}),req.body.password, (err, user) => {
    if(err) {
      return res.json({error: err});
    }
    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if(err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

/**
 * LOG IN
 */
//  router.post('/login', function(req, res, next){
//   if(!req.body.user.email){
//     return res.status(422).json({errors: {email: "can't be blank"}});
//   }

//   if(!req.body.user.password){
//     return res.status(422).json({errors: {password: "can't be blank"}});
//   }

//   passport.authenticate('local', {session: false}, function(err, user, info){
//     if(err){
//       return next(err); 
//     }
//     if(user){
//       user.token = user.generateJWT();
//       req.session.token = user.token;
//       req.session.user = user.toAuthJSON();
//       req.user = req.session.user;
//       console.log(req.user)
//       return res.redirect('/business');
//     } else {
//       console.log(err);
//       console.log(info);
//       return res.status(422).json(info);
//     }
//   })(req, res, next);

// });

router.post('/login',passport.authenticate('local', { failureRedirect: '/user/login',}), (req, res, next) => {
  req.session.save((err) => {
      if (err) {
          return next(err);
      }
      res.redirect('/business');
  });
});

router.get('/login',function(req, res, next) {
  res.render('login/login');
});

module.exports = router;
