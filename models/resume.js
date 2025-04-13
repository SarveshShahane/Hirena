const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const allowedSkills = require("../init/skills");
const { number } = require("joi");
const urlRegex = /^(https?:\/\/)?(www\.)?[\w-]+(\.[a-z]{2,})(\/\S*)?$/i;
const resumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    contact: {
      countryCode: { type: String, required: false },
      number: { type: String, required: false },
    },
    careerObjective: { type: String, required: false },
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    workExperience: [
      {
        jobRole: String,
        company: String,
        yearsWorked: String,
        details: String,
      },
    ],
    extraActivities:[ { type: String, required: false }],
    trainingsAndCourses: [
      {
        courseName: String,
        organization: String,
        certificateLink: String,
      },
    ],

    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        repoLink: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return urlRegex.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
        },
        liveDemo: {
          type: String,
          required: true,
          validate: {
            validator: function (v) {
              return urlRegex.test(v);
            },
            message: (props) => `${props.value} is not a valid URL!`,
          },
        },
      },
    ],

    skills: [
      {
        type: String,
        enum: allowedSkills,
      },
    ],
    portfolio: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return v === "" || urlRegex.test(v); // Allow empty values or valid URLs
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    additionalDetails: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
