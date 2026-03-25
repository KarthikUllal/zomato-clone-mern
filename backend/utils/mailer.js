const {Resend} = require("resend");
require("dotenv").config()

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async({to, subject, html}) =>{
  console.log("This function is called");
  try{
    await resend.emails.send({
      from :"onboarding@resend.dev",
      to,
      subject,
      html
    })
    console.log("Email sent to:", to);
  }
  catch(error){
    console.log("Error sending email:", error);
  }
}

module.exports = sendMail;

// //utils/mailer.js

// const nodemailer = require("nodemailer");
// require("dotenv").config()
// //nodemailer object

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass: process.env.USER_PASSWORD,
//   },
// });

// module.exports = transporter;


// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass: process.env.USER_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
//   family: 4 ,
//   connectionTimeout: 30000,
//   greetingTimeout: 30000,
//   socketTimeout: 30000,
// });

// module.exports = transporter;