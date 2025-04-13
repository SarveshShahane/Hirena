const Joi = require("joi");

module.exports.jobSchema = Joi.object({
  job: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    company: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
    jobType: Joi.string()
      .valid("Full-Time", "Part-Time", "Contract", "Freelance", "Internship")
      .required(),
    category: Joi.string().min(2).max(50).required(),
    salary: Joi.number().positive().optional(),
    description: Joi.string().min(10).max(5000).required(),
    requirements: Joi.string().min(10).max(2000).required(),
    responsibilities: Joi.string().max(2000).optional(),
    postedAt: Joi.date().default(Date.now),
    deadline: Joi.date().greater("now").optional(),
    status: Joi.string().valid("Open", "Closed", "Paused").default("Open"),
  }).required(),
});

module.exports.userSchema = Joi.object({
    user: Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(50).required(),
      role: Joi.string().valid("Admin", "Employer", "JobSeeker").required(),
    }).required(),
  });