const nodemailer = require('nodemailer');
const pool = require("../db");
const keys =require('../keys.json')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



const sendEmail = async (email, subject, html, replyTo='do-not-reply@joatapp.com')=>{
  const joatEmail = process.env.EMAIL;
  //Dont Know why it only works with my email as the sender but for now it does
  const Transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: 'true',
    name: 'www.joatapp.com',
    auth: {
      type: 'OAuth2',
      user: "donotreply@joatapp.com",
      serviceClient: keys.client_id,
      privateKey: keys.private_key
    }
  });
  const sender = "'DO NOT REPLY'<do-not-reply@joatapp.com>"
  const mailOptions = {
    from: sender,
    to: email,
    subject: subject,
    html: html,
    replyTo: replyTo
  };

  Transport.sendMail(mailOptions, function(err, resp){
    if(err){
      console.log(err);
    } else {
      console.log(resp);
      console.log("Sent!");
    }
  })
}


module.exports = sendEmail
