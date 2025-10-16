const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const User2 = require("./user");
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Open", "Closed", "Paused"],
    default: "Open",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  applications: [{ type: Schema.Types.ObjectId, ref: "Application" }],
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
