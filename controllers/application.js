const Application = require("../models/application");
const Job = require("../models/job");
const Resume = require("../models/resume");
const User = require("../models/user");

const { isResumeComplete } = require("../utils/resumeCheck");

module.exports.newApplication = async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).send("Job not found");

  const resume = await Resume.findOne({ user: req.user._id });

  res.render("jobs/apply", { job, resume });
};

module.exports.applyForJob = async (req, res) => {
  const user = await User.findById(req.user._id).populate("profile.resume");

  if (!user.profile.resume || !isResumeComplete(user.profile.resume)) {
    req.flash("error", "Please complete your resume before applying.");
    return res.redirect("/profile/resume");
  }

  const { jobId } = req.params;
  const { coverLetter } = req.body;

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).send("Job not found");

  const resume = await Resume.findOne({ user: req.user._id });
  if (!resume)
    return res.status(400).send("Resume not found. Please create one.");

  const existingApplication = await Application.findOne({
    job: jobId,
    jobSeeker: req.user._id,
  });

  if (existingApplication) {
    return res.status(400).send("You have already applied for this job.");
  }

  const application = new Application({
    job: jobId,
    employer: job.owner,
    jobSeeker: req.user._id,
    resume: resume._id,
    coverLetter,
  });

  await application.save();
  job.applications.push(application._id);
  await job.save();

  res.redirect(`/jobs/${jobId}`);
};

module.exports.getAllApplications = async (req, res) => {
  const applications = await Application.find({ employer: req.user._id })
    .populate("jobSeeker", "username email")
    .populate("job", "title")
    .populate("resume");
  res.render("employers/application", { applications });
};

module.exports.getAllApplicationsForJobSeeker = async (req, res) => {
  const applications = await Application.find({ jobSeeker: req.user._id })
    .populate("job", "title")
    .populate("resume");
  res.render("jobs/application", { applications });
};

module.exports.viewResume = async (req, res) => {
  const { resumeId } = req.params;
  const resume = await Resume.findById(resumeId).populate(
    "user",
    "username email"
  );
  if (!resume) return res.status(404).send("Resume not found");
  res.render("employers/viewResume", { resume });
};

module.exports.updateApplicationStatus = async (req, res) => {
  const { appId } = req.params;
  const { status } = req.body;
  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).send("Invalid status");
  }
  await Application.findByIdAndUpdate(appId, { status });
  res.redirect("/employer/applications");
};
