// <!--  WEN HAO FENG 301223017 -->
//GIT PUSH HEROKU MAIN
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var session = require('express-session')
var flash = require('connect-flash');
const User = require('./models/User');
var methodOverride = require('method-override');
const config = require('./config')
var favicon = require('serve-favicon')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'helloevan', cookie: { maxAge: 1000 * 60 * 60 *24 }, resave: false, saveUninitialized: false  }));
// app.use(errorhandler());
app.use(methodOverride("_method"));
app.use(flash());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))




app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

console.log(config.mongoURI);

mongoose.connect(config.mongoURI);
mongoose.set('debug',true);
/**
 * router
 */
//router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projects');
var contactRouter = require('./routes/contact');
var aboutmeRouter = require('./routes/aboutme');
var skillsRouter = require('./routes/skills');
var businessRouter = require('./routes/business');

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/projects',projectRouter);
app.use('/contact',contactRouter);
app.use('/about',aboutmeRouter);
app.use('/services',skillsRouter);
app.use('/business',businessRouter);


app.use(function(req, res, next) {
  print(res.err);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


module.exports = app;
