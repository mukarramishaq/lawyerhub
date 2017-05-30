module.exports.profile = function(req,res){
	res.render('index',{title:'Profile',linkHome:'/',nameHome:'LawyerHub'});
};
module.exports.dashboard = function(req,res){
	//res.render('dashboard',{title:'Dashboard',linkHome:'/',nameHome:'LawyerHub',userName:'Dummy'});
	var sess = req.session;
	//check session existed
	if(sess.emailid && sess.type == req.params.userType){
		res.render('dashboard',{title:'Dashboard',linkHome:'/',nameHome:'LawyerHub',userName:sess.emailid});
	}
	//otherwise redirect to home
	else{
		res.redirect('/');
	}
};
