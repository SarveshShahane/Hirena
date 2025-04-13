const Job = require("../models/job");
const Application = require("../models/application");
const categories = require("../init/categories");
module.exports.dashboard = async (req, res) => {
    const jobs = await Job.find({ owner: req.user._id }).populate("applications");
    
    res.render("employers/dashboard.ejs", {
        user: req.user,
        jobs: jobs
    });

}