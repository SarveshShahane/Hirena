const Job = require("../models/job");

module.exports.index = async (req, res) => {
    const jobs = await Job.find({});
    res.render("index.ejs", { jobs, role: req.user.role });
  };
  
  module.exports.contact = async (req, res) => {
    res.render("contact.ejs", { role: req.user.role });
  }
 module.exports.contact = async (req, res) => {
    res.render("contact2.ejs", { role: req.user.role2 });
  }

  module.exports.about = async (req, res) => {
    res.render("about.ejs");
  }
