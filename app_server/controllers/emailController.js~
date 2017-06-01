var nodemailer = require('nodemailer');

module.exports.sendEmail = function(req,res){
	var sess = req.session;
	if(sess.user){
		var transporter = nodemailer.createTransport({
			service:'Gmail',
			auth:{user:'mukarramishaq189@gmail.com',pass:'software@GHQ189'}
		});
		var mailOpetions = {
			from:'mukarramishaq189@gmail.com',
			to: sess.user.emailid,
			subject:'Verify Signup | LawyerHub',
			html: '<b>Thank for choosing us!</b>'
		};
		
		transporter.sendMail(mailOptions,function(error,info){
			if(error){
				return false;
			}
			else{
				return true;
			}
		});
	}
	else{
		return res.redirect('/');
	}
};
