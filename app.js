var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//database packages
var mongoose= require('mongoose');

//auth packages
var passport= require('passport');
var session= require('express-session');
var flash= require('connect-flash');
var localStrategy= require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();



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

//enable flash for the following message
app.use(flash());
//passport config
app.use(session({
  secret:'dirty little secret',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//add the account model
var Account= require('./models/account');
passport.use(Account.createStrategy());
passport.use(new localStrategy(Account.authenticate()));


//serialize and deserialize users
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use('/', routes);
app.use('/users', users);

//db connection
var db= mongoose.connection;
db.on('error', console.error.bind(console, "db error: "));
db.once('open', function(callback){
  console.log('db connected');
});

var dbConfig= require('./config/db.js');
mongoose.connect(dbConfig.url);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
