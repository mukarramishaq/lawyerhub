var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');
require('./app_server/models/db');
var index = require('./app_server/routes/index');
var users = require('./app_server/routes/users');
var loginRouter = require('./app_server/routes/login');
var signupRouter = require('./app_server/routes/signup');
var logoutRouter = require('./app_server/routes/logout');
var dashboardRouter = require('./app_server/routes/dashboard');
//var loginController = require('./app_server/controllers/login');
//var signupController = require('./app_server/controllers/signup');
var app = express();
//var session = require('client-sessions');

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine','jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//initialize the session
app.use(cookieSession({
	name: 'session',
	secret: 'lakdjflaksdjfklasdjfosduieoruw,wenqr,mnrqw,emrn',
	maxAge: 30*60*1000
	}));
//add routers 
app.use('/', index);
app.use('/', loginRouter);
app.use('/', signupRouter);
app.use('/',dashboardRouter);
app.use('/',logoutRouter);
//app.post('/createAccount',function(req,res){console.log(req.body);});
app.use('/users', users);

//app.use('/login/verify', loginRouter);
//app.post('login/verify',loginController.loginVerifier)
/**/
//app.get('/signup/:userType', signupController.signup);

/*******session ********/
app.use(session({
	cookieName:'session',
	secret: 'dslvsa;poierldsjdlkfjeooiwfldsfjf12345678ikmnb3456789okjmnve3456780987654567890',
	duration: 30*60*1000,
	activeDuration:5*60*1000
	}));


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
