module.exports.logout = function(req,res){
	//res.render('index',{title:'Home',linkHome:'/',nameHome:'LawyerHub'});
	req.session = null;
	res.redirect('/');
};
