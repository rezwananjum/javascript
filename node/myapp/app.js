var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// routes variable paath
var index = require('./routes/index');
var about = require('./routes/about');
var products = require('./routes/products');
var register = require('./routes/register');
var contact = require('./routes/contact');

var app = express();

//local variables and local variables to use json variable

app.locals.products = "Products";
app.locals.somedata = require('./jasonTesting.json');// want to use this variable in view index.ejs


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Project routers
app.use('/', index);
app.use('/about',about);
app.use('/products',products);
app.use('/register',register);
app.use('/contact',contact);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
