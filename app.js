// <!--  WEN HAO FENG 301223017 -->
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var errorhandler = require('errorhandler');
var passport = require('passport');
var session = require('express-session')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'helloevan', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));
app.use(errorhandler());

mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
mongoose.set('debug',true);


require('./models/User');
require('./config/passport');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projects');
var contactRouter = require('./routes/contact');
var aboutmeRouter = require('./routes/aboutme');
var skillsRouter = require('./routes/skills');


/**
 * router
 */

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/projects',projectRouter);
app.use('/contact',contactRouter);
app.use('/about',aboutmeRouter);
app.use('/services',skillsRouter);


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
