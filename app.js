var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app =express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

//to render index page as a starter page & we can pass arguments while randering the page.
app.get('/',function(req,res){
  res.render('index',{title:'Welcome'});
});
//To render about page.
app.get('/about',function(req,res){
  res.render('about');
});
// To reder Contact page.
app.get('/contact',function(req,res){
  res.render('contact');
});
//TO handle post method of contact page.
app.post('/contact/send',function(req,res){
    var transporter = nodeMailer.createTransport({
      service:'Gmail',
      auth: {
              user:'techsupport@gmail.com',
              pass: ''
      }
    });

    var mailOption = {
      from: 'Tech guy <techsupport@gmail.com>',
      to: 'support@gmail.com',
      subject: 'Website Submission',
      text:'You have a submission with following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
      html:'<p>You have a submission with following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.messag+'</li></ul>'
      };

      transporter.sendMail(mailOption,function(error,info){
        if(error){
          console.log(error);
          res.redirect('/');
        }else{
          console.log('Message sent'+info.response);
          res.redirect('/');
        }
      })
});
app.listen(3002);
console.log('server is running on port 3002');
