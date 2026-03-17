const nodemailer = require("nodemailer");
require("dotenv").config()
//nodemailer object

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

module.exports = transporter;