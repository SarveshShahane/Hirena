const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/auth.js");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailer");
require("dotenv").config();

const {
  checkRole,
  isAdmin,
  isEmployer,
  isLoggedIn,
} = require("../middlewares/auth");
const userController = require("../controllers/user.js");
//signupForm
router.get("/signup", userController.signupForm);

//signup
router.post("/signup", wrapAsync(userController.signup));

//mailVerify
router.get("/verify-email/:token", wrapAsync(userController.mailVerify));

router.get("/login", userController.loginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(userController.login)
);

router.get("/logout",wrapAsync( userController.logout));
module.exports = router;
