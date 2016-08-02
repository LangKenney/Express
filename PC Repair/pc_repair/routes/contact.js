var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res){
// create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'Lang411@gmail.com',
            pass: ''
        }
    });
    
    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Lang K <Lang411@gmail.com>', // sender address
        to: 'Langk411@yahoo.com', // list of receivers
        subject: 'PC repair website submission', // Subject line
        text: 'You have a new request:'+ req.body.name+ '-email:' +req.body.email +'-Message:'+ req.body.message, // plaintext body
        html: '<h1>You have a new request:</h1><ul><li>req.body.name</li><li> req.body.email </li> <li> req.body.message</li></ul>' // html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }
        console.log('Message sent: ' + info.response);
        res.redirect('/');
    
    });
})

module.exports = router;