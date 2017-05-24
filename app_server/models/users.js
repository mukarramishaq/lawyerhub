var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
		firstname:{type:String,required:true},
		lastname:{type:String,required:true},
		emailid:{type:String,required:true},
		password:{type:String,required:true},
		type:{type:String,required:true}
	});

