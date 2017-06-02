var Profile = require('../models/profileSchema');
var User = require('../models/userSchema');
module.exports.handle = function(req,res){
	var sess = req.session;
	sess.requestedProfile = req.params.userEmailId; 
	if(sess.emailid && sess.emailid == req.params.userEmailId){
		if(sess.type == 'lawyer'){
			return res.render('profile2',						{title:'Profile',linkHome:'/',nameHome:'LawyerHub','status':'200',isActive:true,isActiveJS:'active.js',userName:sess.emailid,apName:'Recent Posts',apLink:'/dashboard/lawyer'});
		}
		else{
			return res.render('profile2',						{title:'Profile',linkHome:'/',nameHome:'LawyerHub','status':'200',isActive:true,isActiveJS:'active.js',userName:sess.emailid,apName:'My Posts',apLink:'/dashboard/client/myposts'});
		}
	}
	else{
		return res.render('profile2',{title:'Profile',linkHome:'/',nameHome:'LawyerHub','status':'200',isActive: false,isActiveJS:'inactive.js'});
	}
};

module.exports.get = function(req,res){
	var sess = req.session;
	User.findOne({'emailid':sess.requestedProfile},function(err,user){
		if(err){
			console.log(err);
			return res.json({'status':'400','msg':'Sorry, Could not load the request profile.'});
		}
		else{
			var userProfile = {firstname:user.firstname,lastname:user.lastname,emailid:user.emailid};
			console.log(userProfile);
			return res.json({'status':'OK',profile:userProfile});
		}
	});
	
	
};
module.exports.update = function(req,res){
	return res.json({'status':'300','msg':'I am too young for this.'});
};
