var nodemailer = require('nodemailer');

module.exports.sendEmail = function(req,res,next){
	var sess = req.session;
	if(sess.user){
		var transporter = nodemailer.createTransport({
			service:'Gmail',
			auth:{user:'mukarramishaq188@gmail.com',pass:'noriaz786'}
		});
		var mailOptions = {
			from:'mukarramishaq188@gmail.com',
			to: sess.user.emailid,
			subject:'Verify Signup | LawyerHub',
			html: '<b>Thank for choosing us! Please open the following link to verify your sign up!</b><a href="lawyerhub.herokuapp.com/signup/confirmation/'+sess.user.type+'/'+sess.user.emailid+'/'+sess.key1+'/'+sess.key2+'">Confirm Registration!</a>'
		};
		
		transporter.sendMail(mailOptions,function(error,info){
			if(error){
				console.log('ERROR while sending email::::'+error);
				req.session = null;
				return res.json({'status':'300','msg':'Internal Server error: Please try again later',alertTime:5000});
			}
			else{
				return res.json({'status':'OK','msg':'We have sent a verification link to your email address. Please check your email to confirm the sign up. And Please open the link in the same window within 30 mins otherwise that link will become invalid after 30 mins.',alertTime:10000});
			}
		});
	}
	else{
		return res.redirect('/');
	}
};