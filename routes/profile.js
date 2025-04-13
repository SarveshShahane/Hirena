const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isAdmin,
  isEmployer,
  checkRole,
} = require("../middlewares/auth");
const skills = require("../init/skills");
const wrapAsync = require("../utils/wrapAsync");
const profileController = require("../controllers/profile");


//view profile
router.get("/", wrapAsync(profileController.profile));

//update profile
router.put("/", wrapAsync(profileController.updateProfile));

//view resume
router.get("/resume", isLoggedIn, wrapAsync(profileController.viewResume));

//update resume
router.post("/resume", isLoggedIn, wrapAsync(profileController.updateResume));

module.exports = router;
