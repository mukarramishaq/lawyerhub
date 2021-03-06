var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://mukarram:qwerty@ds119091.mlab.com:19091/lawyerhubdb';
mongoose.connect(dbURI);

/*******Listen for Mongoose
connection events
and output statuses
to console********/
mongoose.connection.on('connected',function(){
	console.log('Mongoose connection to DB: '+dbURI+' is established successfully');
});
mongoose.connection.on('error',function(err){
	console.log('Mongoose connection error: '+err);
});
mongoose.connection.on('disconnected',function(){
	console.log('Mongoose disconnected.');
});

/******Reusable function
to close Mongoose
connection******/
gracefulShutdown = function(msg,callback){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through '+msg);
		callback();
	});
};

/************ Listen to Node processes for termination or restart signals,
and call gracefulShutdown function when appropriate,
passing a continuation callback *********************/
//for nodemon restart
process.once('SIGUSR2',function(){
	gracefulShutdown('Nodemon restarts',function(){
		process.kill(process.pid,'SIGUSR2');
	});
});
//for app terminates
process.on('SIGINT',function(){
	gracefulShutdown('App termination',function(){
		process.exit(0);
	});
});
//for heroku app termination
process.on('SIGTERM',function(){
	gracefulShutdown('Heroku app shutdown',function(){
		process.exit(0);
	});
});
