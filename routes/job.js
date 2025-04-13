const express = require("express");
const router = express.Router({ mergeParams: true });
const Job = require("../models/job");

const {
  isLoggedIn,
  isAdmin,
  isEmployer,
  checkRole,
  isJobSeeker,
} = require("../middlewares/auth");

const wrapAsync = require("../utils/wrapAsync");
const { jobSchema } = require("../schema");

const jobController = require("../controllers/job");

const validateJob = (req, res, next) => {
  let { error } = jobSchema.validate(req.body);
  if (error) {
    console.log(error);
  }
  next();
};

//Job List
router.get("/list", isLoggedIn, isJobSeeker, wrapAsync(jobController.list));
//index


//new
router.get("/new", isLoggedIn, jobController.newForm);
//newJob
router.post("/", isLoggedIn, isEmployer, wrapAsync(jobController.newJob));

//edid form
router.get(
  "/edit/:id",
  isLoggedIn,
  isEmployer,
  wrapAsync(jobController.editForm)
);

//editedJob
router.put("/:id", wrapAsync(jobController.editedJob));

//show
router.get("/:id", isLoggedIn, wrapAsync(jobController.show));

//delete
router.delete(
  "/delete/:id",
  isLoggedIn,
  wrapAsync(jobController.delete)
);

module.exports = router;
