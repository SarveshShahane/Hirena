const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  

module.exports.sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:2022/verify-email/${token}`;

  await transporter.sendMail({
    from: `"Job Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<h3>Verify your email</h3>
           <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  });
};
