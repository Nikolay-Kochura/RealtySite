var express=require('express');
var nodemailer = require("nodemailer");
var app=express();


app.set('port', 3000);
/*
Using GMAIL
 */

var smtpTransport = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: 'your@gmail.com', // your e-mail
		pass: '****'			// password of your e-mail
	},
	tls: {rejectUnauthorized: false},
	debug:true
});


/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('index.html');
});
app.get('/send',function(req,res){
	var mailOptions={
		to : 'first@gmail.com, second@yandex.ua, third@mail.com',
		subject : req.query.subject,
		text : req.query.text,
		html: req.query.subject+"<b>Hello  </b>" // html body
	}
	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		}else{
			console.log("Message sent: " + response.message);
			res.end("sent");
		}
	});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});

