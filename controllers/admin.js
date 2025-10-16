const Job = require("../models/job");
const Application = require("../models/application");
const categories = require("../init/categories");
const User = require("../models/user");
// om shahane
module.exports.dashboard=async (req, res) => {
    const jobs = await Job.find({}).populate("applications");
    res.render("admin/dashboard.ejs", {
      user: req.user,
      jobs: jobs,
    });
  }

  module.exports.manageUsers=async (req, res) => {
    const employers = await User.find({ role: "Employer" });
    const jobSeekers = await User.find({ role: "JobSeeker" });
  
    res.render("admin/manage-users", {
      employers,
      jobSeekers,
      user: req.user,
    });
  }
