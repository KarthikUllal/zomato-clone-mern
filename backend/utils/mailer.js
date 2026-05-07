
const sgMail = require('@sendgrid/mail');

require("dotenv").config();
const from_EMAIL = process.env.from_EMAIL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);




const sendMail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const payload = {
      from: from_EMAIL,
      to,
      subject,
      html,
    };

    if (attachments.length > 0) {
      payload.attachments = attachments;
    }

    await sgMail.send(payload);

    console.log("Email sent to:", to);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = sendMail;