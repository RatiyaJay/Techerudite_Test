const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter;

if (process.env.MAIL_TYPE === "gmail") {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
} else if (process.env.MAIL_TYPE === "outlook") {
  transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });
} else {
  throw new Error("Unsupported MAIL_TYPE. Use 'gmail' or 'outlook'.");
}

module.exports = async function sendEmail(to, code) {
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`,
  });
};
