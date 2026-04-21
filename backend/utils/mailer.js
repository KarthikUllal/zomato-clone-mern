const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const payload = {
      from: "Zomato Clone <onboarding@resend.dev>",
      to,
      subject,
      html,
    };

    if (attachments.length > 0) {
      payload.attachments = attachments;
    }

    await resend.emails.send(payload);

    console.log("Email sent to:", to);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = sendMail;