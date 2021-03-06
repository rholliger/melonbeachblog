require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

require('./app_api/libs/db');
require('./app_api/config/passport');

var frontendRoutes = require('./app_server/routes/index');
var backendRoutes = require('./app_server/routes/admin');
var apiRoutes = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'melonbeach secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

// Add sass functionalities
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'app_server'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Initialize passport
app.use(passport.initialize());

// API Routes
app.use('/api', apiRoutes);
// Admin (Backend) Routes
app.use('/admin', backendRoutes);
// Front-End (Blog) Routes
app.use('/', frontendRoutes);

// error handlers
// Catch unauthorized errors
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      message: err.name + ": " + err.message
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
