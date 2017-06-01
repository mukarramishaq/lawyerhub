var User = require('../models/userSchema');
var randomstring = require("randomstring");
var emailController = require('./emailController');
module.exports.signup = function(req,res){
	var userType = req.params.userType;
	//console.log('sh'+req.params['userType']);
	if(userType == 'lawyer'){
		//console.log('-----> ut:'+userType);
		res.render('signup',{title:'Signup',linkHome:'/',nameHome:'LawyerHub',userType:'lawyer',inverseUserType:'client'});
	}
	else{
		//console.log('!!!!!-----> ut:');
		res.render('signup',{title:'Signup',linkHome:'/',nameHome:'LawyerHub',userType:'client',inverseUserType:'lawyer'});
	}
};
module.exports.verifySignupLink = function(req,res){
	var userType = req.params.userType;
	var emailid = req.params.emailid;
	var key1 = req.params.key1;
	var key2 = req.params.key2;
	var sess = req.session;
	if(sess.user){
		if(userType == sess.user.type && emailid == sess.user.emailid && key1 == sess.key1 && key2 == sess.key2){
			var newUser = sess.user;
			newUser.save(function(error){
				if(error){
						console.log('internal server error: '+error);
						res.render('invalid',{title:'Home',linkHome:'/',nameHome:'LawyerHub',invalidHeader:'Internal Server Error',invalidDescription:'Due to some internal errors your request cannot be granted. Please try again later'});
				}
				else{
					console.log('successfull');
					req.sess = null;
					res.render('invalid',{title:'Home',linkHome:'/',nameHome:'LawyerHub',invalidHeader:'Verification Successful',invalidDescription:'Thank you for registering. Please log in to get access.'});
					//return res.redirect('/login/'+user.type);
				}
			});
		}
	}
	else{
		return res.render('invalid',{title:'Home',linkHome:'/',nameHome:'LawyerHub',invalidHeader:'Invalid Link',invalidDescription:'This link is no more valid. Sign up again and then verify that link in the same window of browser within 30 minutes because the link will become useless after 30 minutes. And you must open the link in that window of browser where you have signed up. Thanks.'});
	}
}
module.exports.action = function(req,res){
	var user = {firstname:req.query.firstname,lastname:req.query.lastname,
				emailid:req.query.email,password:req.query.password,type:req.query.userType
			};
	//resData = {};
	//console.log(req.query.email);
	User.findOne({'emailid':user.emailid},function(err,usr){
		if(err) res.json({'status':'300','msg':'Internal Server error. Please try again later'});
		else if(!usr){
			console.log(';;;;;;DOES nOT exists!!!!!');
			var flag = false;
			for(var x in user){
				if(!user.hasOwnProperty(x)){
					//resData = {'status':'400','message':'Invalid data'};
					flag = true;
					break;
				}
				console.log(x+':'+user[x]);
			}
			if(!flag){
				var newUser = new User(user);
				var sess = req.session;
				sess.user = newUser;
				sess.key1 = randomstring.generate();
				sess.key2 = randomstring.generate();
				//first send verifcation email
				emailController.sendEmail(req,res);
				
				/*newUser.save(function(err){
					if(err){
						console.log('internal server error: '+err);
						res.json({'status':'300','msg':'Internal Server error: Error during saving your details!'});
					}
					else{
						console.log('successfull');
						res.json({'status': 'OK','isSuccessful':true,'msg':'Sign up successful!'});
						//return res.redirect('/login/'+user.type);
					}
			
				});*/
			}
			else{
				console.log('invalid data');
				res.json({'status':'400','msg':'Invalid data'});
			}
		}
		else{
			console.log(';;;;;;Already exists!!!!!');
			res.json({'status':'500','msg':'User with this email address already exists'});
		}
	});
	
	//console.log('hahaha');
};
