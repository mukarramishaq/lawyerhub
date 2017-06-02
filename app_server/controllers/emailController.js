var nodemailer = require('nodemailer');

module.exports.sendEmail = function(req,res,next){
	var sess = req.session;
	if(sess.user){
		var transporter = nodemailer.createTransport({
			service:'Gmail',
			auth:{
				user:'mukarramishaq188@gmail.com',
				pass:'noriaz786'
			}
		});
		var link = '"lawyerhub.herokuapp.com/signup/confirmation/'+sess.user.type+'/'+sess.user.emailid+'/'+sess.key1+'/'+sess.key2+'"';
		var htmlBody = '<head></head><body> <div style="background-color:#fff;margin:0 auto 0 auto;padding:30px 0 30px 0;color:#4f565d;font-size:13px;line-height:20px;font-family:\'Helvetica Neue\',Arial,sans-serif;text-align:left;"> <center> <table style="width:550px;text-align:center"> <tbody> <tr> <td colspan="2" style="padding:30px 0;"> <p style="color:#1d2227;line-height:28px;font-size:22px;margin:12px 10px 20px 10px;font-weight:400;">Welcome to LawyerHub</p> <p style="margin:0 10px 10px 10px;padding:0;">We\'d like to make sure we got your email address right.</p> <p> <a style="display:inline-block;text-decoration:none;padding:15px 20px;background-color:#2baaed;border:1px solid #2baaed;border-radius:3px;color:#FFF;font-weight:bold;" href='+link+' target="_blank">Yes, I confirm my subscription.</a> </p> </td> </tr> </tbody> </table> </center> </div> </body>';
		var mailOptions = {
			from:'mukarramishaq188@gmail.com',
			to: sess.user.emailid,
			subject:'Verify Signup | LawyerHub',
			html: htmlBody
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
