var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/***************Schema of User collection or table ****************/
var PostSchema = new Schema({
	firstname:{type:String,required:true},
	lastname:{type:String,required:true},
	profession:{type:String,required:true},
	experience:{type:String},
	emailid:{type:String,required:true},
	contactno:{type:String,required:true},
	country:{type:String,required:true},
	province:{type:String,required:true},
	city:{type:String,required:true},
});

module.exports = mongoose.model('Profile', PostSchema);
