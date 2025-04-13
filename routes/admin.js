const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  isAdmin,
  isEmployer,
  checkRole,
} = require("../middlewares/auth");
const User = require("../models/user");
const adminController = require("../controllers/admin");

router.get("/dashboard", isLoggedIn, isAdmin, wrapAsync(adminController.dashboard));
router.get("/manage-users", isLoggedIn, isAdmin,wrapAsync(adminController.manageUsers));

module.exports = router;
