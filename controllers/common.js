const Job = require("../models/job");

module.exports.index = async (req, res) => {
    const jobs = await Job.find({});
    res.render("index.ejs", { jobs, role: req.user.role });
  };
  