/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-12 00:18:13 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-12 00:19:58
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function (email, password, done) {
    User.findOne({ email: email }).then(function (user) {
        if (!user || !user.validPassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }

        return done(null, user);
    }).catch(done);
}));

