var mongoose = require('mongoose');
var dbURI = 'mongodb://mukarram:qwerty@ds119091.mlab.com:19091/lawyerhubdb';
mongoose.connect(dbURI);

mongoose.connection.on('connected',function(){
	console.log('Mongoose connection to DB: '+dbURI+' is established successfully');
});
mongoose.connection.on('error',function(err){
	console.log('Mongoose connection error: '+err);
});
mongoose.connection.on('disconnected',function(){
	console.log('Mongoose disconnected.');
});
