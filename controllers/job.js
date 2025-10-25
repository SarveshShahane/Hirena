const Job = require("../models/job");
const Application = require("../models/application");
const categories = require("../init/categories");
const { jobSchema } = require("../schema");

module.exports.list = async (req, res) => {
  let query = {};
  const user = req.user;
  const cat = req.query.job?.category;

  if (cat && categories.includes(cat)) {
    query.category = cat;
  }

  const jobs = await Job.find(query).populate("applications");

  if (!jobs || jobs.length === 0) {
    return res.render("jobs/jobList", {
      jobs: [],
      categories,
      user,
      message: "No jobs found.",
    });
  }

  res.render("jobs/jobList", {
    jobs,
    categories,
    user,
    message: null,
  });
};


module.exports.newForm = (req, res) => {
  res.render("employers/new.ejs", { categories });
};

module.exports.newJob = async (req, res) => {
  const newJob = new Job(req.body.job);
  newJob.owner = req.user._id;

  await newJob.save();
  console.log(newJob);
  res.redirect(`/jobs/${newJob._id}`);
};

module.exports.editForm = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).send("Job not found");
  }
  res.render("employers/edit.ejs", { job, categories });
};

module.exports.editedJob = async (req, res) => {
  let { id } = req.params;
  await Job.findByIdAndUpdate(id, req.body.job);
  res.redirect("/employers/dashboard");
};
module.exports.editedJob2 = async (req, res) => {
  let { id } = req.params2;
  await Job.findByIdAndUpdate(id, req.body.job);
  res.redirect("/employers/dashboard");
};

module.exports.show = async (req, res) => {
  const details = await Job.findById(req.params.id).populate("applications");
  if (!details) {
    return res.status(404).send("Job not found");
  }
  let owner = details.owner;
  let applications = await Application.find({ employer: owner });
  let accepted = applications.filter((app) => app.status == "Accepted");

  res.render("jobs/show.ejs", { job: details, hired: accepted.length });
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  if (req.user_id === Job.findById(id).owner || req.user.role === "Admin") {
    await Job.findByIdAndDelete(req.params.id);
  }
  if (req.user.role === "Admin") {
    res.redirect("/admin/dashboard");
  } else if (req.user.role === "Employer") {
    res.redirect("/employers/dashboard");
  }
};
