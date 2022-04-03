require('dotenv').config()
const appRoot=require('app-root-path')
const nodemailer=require('nodemailer')


module.exports.sendMail =(to_email,link,temp)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user_name,
      pass: process.env.password
    }
  });
  
var mailOptions = {
  from: process.env.user_name,
  to:to_email,
  subject: 'Hi',
  text: 'Bye',
  html: temp
};

  return new Promise(function (resolve, reject){
     transporter.sendMail(mailOptions, (err, info) => {
        if (err) {

           reject(err);
        } else {
           resolve(info);
        }
     });
  })
}