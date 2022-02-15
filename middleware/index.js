/*
 * @Author: Wenhao FENG 
 * @Date: 2022-02-14 22:52:06 
 * @Last Modified by: Wenhao FENG
 * @Last Modified time: 2022-02-15 00:32:30
 */

var BusinessContact = require('../models/BusinessContact');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }else {
        req.flash('error','please login first');
        res.redirect('/user/login');
    }
}

module.exports = middlewareObj;
