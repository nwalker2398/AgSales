var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var loginRouter = require('./routes/login');
var productListRouter = require('./routes/productList');

// Initalize server
var app = express();

// Set up development config
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up controllers
app.use('/login', loginRouter);
app.use('/products', productListRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Only give errors in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log errors to the console
  res.status(err.status || 500);
  console.log(err);
});

module.exports = app;