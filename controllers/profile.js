
const User = require("../models/user");
const Resume = require("../models/resume");
const skills = require("../init/skills");

  // Function to check if the resume is complete
  const isResumeComplete = (resume) => {
    return (
      resume.careerObjective &&
      resume.contact &&
      resume.education.length > 0 &&
      resume.workExperience.length > 0 &&
      resume.skills.length > 0
    );
  };
module.exports.profile=async (req, res) => {
    if (!req.user) return res.redirect("/login");
    res.render("profile", { user: req.user });
  }

  module.exports.updateProfile=async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.profile.fullName = req.body.fullName || user.profile.fullName;
    user.profile.bio = req.body.bio || user.profile.bio;
    user.profile.location = {
      city: req.body.city || user.profile.location?.city,
      country: req.body.country || user.profile.location?.country,
    };
    await user.save();
    res.redirect("/profile");
}

module.exports.viewResume=async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const user = await User.findById(req.user._id).populate("profile.resume");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("jobs/resume.ejs", { user, resume: user.profile.resume || {} ,skills});
}

module.exports.updateResume=async (req, res) => {

    if (!req.user) return res.redirect("/login");

    const { careerObjective, contact, education, workExperience, skills, projects, extraActivities, portfolio, additionalDetails } = req.body;

    let user = await User.findById(req.user._id).populate("profile.resume");

    if (!user) {
      return res.status(404).send("User not found");
    }

    let resume = user.profile.resume;

    const parsedEducation = JSON.parse(education || "[]");
    const parsedWorkExperience = JSON.parse(workExperience || "[]");
    const parsedSkills = JSON.parse(skills || "[]");
    const parsedProjects = JSON.parse(projects || "[]");
    const parsedExtraActivities = JSON.parse(extraActivities || "[]");

    if (!resume) {
      resume = new Resume({
        user: req.user._id,
        careerObjective,
        contact,
        education: parsedEducation,
        workExperience: parsedWorkExperience,
        skills: parsedSkills,
        projects: parsedProjects,
        extraActivities: parsedExtraActivities,
        portfolio,
        additionalDetails,
      });

      await resume.save();
      user.profile.resume = resume._id;
      await user.save();
    } else {
      resume.careerObjective = careerObjective || resume.careerObjective;
      resume.contact = contact || resume.contact;
      resume.education = parsedEducation;
      resume.workExperience = parsedWorkExperience;
      resume.skills = parsedSkills;
      resume.projects = parsedProjects;
      resume.extraActivities = parsedExtraActivities;
      resume.portfolio = portfolio ;
      resume.additionalDetails = additionalDetails || resume.additionalDetails;

      await resume.save();
    }

    res.redirect("/profile/resume");
 
}