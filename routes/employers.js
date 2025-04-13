const express=require("express")
const router=express.Router();

const {
  isLoggedIn,
  isAdmin,
  isEmployer,
  checkRole,
} = require("../middlewares/auth");
const wrapAsync = require("../utils/wrapAsync");
const employerController = require("../controllers/employers");

router.get("/dashboard", isLoggedIn, isEmployer, wrapAsync(employerController.dashboard));
module.exports=router;