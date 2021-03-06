var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/***************Schema of User collection or table ****************/
var PostSchema = new Schema({
	subject:{type:String,required:true},
	description:{type:String,required:true},
	emailid:{type:String,required:true},
	contactno:{type:String,required:true},
	posteddate:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Post', PostSchema);
