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
//

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
	res.sendfile('index.html');
});
app.get('/send',function(req,res){
	var mailOptions={
		to : 'first@mail.com, second@mail.com',
		subject : 'Сообщение из сайта',
		text : req.query.text,
		html:"<span>Имя:  </span>" + req.query.firstName + "<br>" +
				"<span>Фамилия: </span> " + req.query.secondName + "<br>" +
					"<span>Телефон: </span>" + req.query.tel + "<br>" +
					"<span>E-mail: </span>" + req.query.email + "<br>" +
					"<span>Возраст: </span>" + req.query.age + "<br>" +
					"<span>Место работы: </span>" + req.query.job + "<br>" +
					"<span>Состав семьи: </span>" + req.query.family + "<br>" +
					"<span>Информация о квартире: </span>" + req.query.flat + "<br>" +
					"<span>Город: </span>" + req.query.city + "<br>" +
					"<span>Информация о квартире: </span>" + req.query.flatInfo + "<br>" +
					"<span>Район: </span>" + req.query.district + "<br>" +
					"<span>Кол-во комнат: </span>" + req.query.rooms + "<br>" +
					"<span>Срок аренды: </span>" + req.query.lease + "<br>" +
					"<span>Минимальная цена: </span>" + req.query.minPrice + "<br>" +
					"<span>Максимальная цена: </span>" + req.query.maxPrice + "<br>" +
					"<span>Дата заселения: </span>" + req.query.date
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

