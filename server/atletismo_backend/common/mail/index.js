const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'atletismo.scbraga.bot@gmail.com',
        pass: 'BragaAtletismo2018'
    }
});


 exports.sendEmail = function(mailOptions){
   transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});}
