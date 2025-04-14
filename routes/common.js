const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middlewares/auth");
const wrapAsync = require("../utils/wrapAsync");
const commonController = require("../controllers/common");

router.get("/", isLoggedIn, wrapAsync(commonController.index));
router.get("/contact",isLoggedIn, wrapAsync(commonController.contact));
router.get("/about", wrapAsync(commonController.about));
module.exports = router;