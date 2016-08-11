var keystone = require('keystone');
var nodemailer = require('nodemailer')
var cred = require('./cred.js');

exports = module.exports = function (req, res) {
	console.log(req.body.data);
	
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: cred.username,
			pass: cred.pw
		}
	});

	var text = '<h1>Joke Submission!</h1> \n\n <p><b>From:</b> ' +
				req.body.data.name +' <b>@</b> '+ req.body.data.email +
				'</p>\n <p><b>Joke:</b> ' + req.body.data.joke + '</p>'

	var mailOptions = {
		from: cred.username,
		to: cred.to,
		subject: 'J-A-C Submission',
		html: text
	};

	transporter.sendMail(mailOptions, function(error,info) {
		if(error) {
			return console.log(error);
		} else {
			res.sendStatus(200);
			console.log('Message Sent: ' + info.response);
		}
	});

};