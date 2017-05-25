var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SLAT_WORK_FACTOR = 10;

/***************Schema of User collection or table ****************/
var UserSchema = new Schema({
	firstname:{type:String,required:true},
	lastname:{type:String,required:true},
	emailid:{type:String,required:true,index:{unique:true}},
	password:{type:String,required:true},
	type:{type:String,required:true}
});


/*************following function is called 
 * before saving the data into the collection
 * and in this function password is encrpted before saving.
 * ********************/
UserSchema.pre('save',function(next){
	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);

	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, function(err, hash) {
		if (err) return next(err);

		// override the cleartext password with the hashed one
		user.password = hash;
		next();
	    });
	});

});



/*******following function is used to compare 
 * the two passwords which can be used at the time of login etc
 * **********************/
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
	


