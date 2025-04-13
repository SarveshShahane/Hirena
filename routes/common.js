const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middlewares/auth");
const wrapAsync = require("../utils/wrapAsync");
const commonController = require("../controllers/common");

router.get("/", isLoggedIn, wrapAsync(commonController.index));

module.exports = router;