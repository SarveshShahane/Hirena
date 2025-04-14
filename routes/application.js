const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  isAdmin,
  isEmployer,
  checkRole,
  isJobSeeker,
} = require("../middlewares/auth");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const applicationController = require("../controllers/application");
const Application = require("../models/application");
const Job = require("../models/job");
const Resume = require("../models/resume");
const { isResumeComplete } = require("../utils/resumeCheck");
// Create a new application
router.get(
  "/apply/:jobId",
  isLoggedIn,
  isJobSeeker,
  wrapAsync(applicationController.newApplication)
);

// Apply for a job
router.post(
  "/apply/:jobId",
  isLoggedIn,
  isJobSeeker,
  wrapAsync(applicationController.applyForJob)
);
// Get all applications for a job
router.get(
  "/employer/applications",
  isLoggedIn,
  isEmployer,
  wrapAsync(applicationController.getAllApplications)
);

// Get all applications for a job seeker
router.get(
  "/jobseeker/applications",
  isLoggedIn,
  isJobSeeker,
  wrapAsync(async (req, res) => {
    const applications = await Application.find({ jobSeeker: req.user._id })
      .populate("job", "title")
      .populate("resume");
    res.render("jobs/application", { applications });
  })
);

//resumeView
router.get(
  "/resume/:resumeId",
  isLoggedIn,
  isEmployer,
  wrapAsync(applicationController.viewResume)
);

// Update application status
router.post(
  "/update-status/:appId",
  isLoggedIn,
  isEmployer,
  wrapAsync(applicationController.updateApplicationStatus)
);

module.exports = router;
