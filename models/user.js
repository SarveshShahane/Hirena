const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
require('dotenv').config();

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["Admin", "Employer", "JobSeeker"],
      required: true,
    },

    profile: {
      fullName: { type: String, required: false },
      bio: { type: String, required: false },
      location: {
        city: { type: String, required: false },
        country: { type: String, required: false },
      },
      resume: { type: Schema.Types.ObjectId, ref: "Resume" },
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
  },

  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
