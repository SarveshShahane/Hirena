const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/auth.js");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailer");
require("dotenv").config();

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const newUser = new User({ username, email, role, verificationToken });
  const registeredUser = await User.register(newUser, password);

  await sendVerificationEmail(email, verificationToken);

  req.flash("success", "Verification email sent. Please check your inbox.");
  res.redirect("/login");
};
module.exports.signup2 = async (req, res) => {
  const { username, email, password, role } = req.body;
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const newUser = new User({ username, email, role, verificationToken });
  const registeredUser = await User.register(newUser, password);

  await sendVerificationEmail(email, verificationToken);

  req.flash("success", "Verification email sent. Please check your inbox.");
  res.redirect("/login");
};
module.exports.mailVerify = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    req.flash("error", "Invalid or expired verification token.");
    return res.redirect("/login");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  req.flash("success", "Email verified! You can now log in.");
  res.redirect("/login");
};


module.exports.loginForm=(req, res) => {
    res.render("users/login.ejs");
  }


  module.exports.login=async (req, res) => {
    if (!req.user.isVerified) {
      req.flash("error", "Please verify your email before logging in.");
      return res.redirect("/login");
    }

    let { username, password } = req.body;
    if (req.user.role === "Admin") {
      return res.redirect("/admin/dashboard");
    }
    if (res.locals.redirectUrl) {
      res.redirect(res.locals.redirectUrl);
    } else {
      res.redirect("/hirena");
    }
  }


  module.exports.logout=async (req, res) => {
    req.logout((err) => {
      if (err) {
        res.send(err.message);
      }
      res.redirect("/hirena");
    });
  }
