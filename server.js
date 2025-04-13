require("dotenv").config();
const express = require("express");
const app = express();
const Mongo_URL = "mongodb://127.0.0.1:27017/Job_Portal";
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user.js");
const jobs = require("./routes/job");
const user = require("./routes/user");
const passport = require("./config/passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError.js");
const profileRoutes = require("./routes/profile");
const applicationRoutes = require("./routes/application");
const employers = require("./routes/employers.js");
const admin = require("./routes/admin.js");
const common = require("./routes/common.js");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//mongoose connection
main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_URL);
}

//session details
const sessionOptions = {
  secret: process.env.SESSION_SECRET,

  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.get("/", (req, res) => {
  res.redirect("/hirena");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user;
  next();
});

app.use("/hirena", common);
app.use("/jobs", jobs);
app.use("/", user);
app.use("/profile", profileRoutes);
app.use("/", applicationRoutes);
app.use("/employers", employers);
app.use("/admin", admin);

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.render("error.ejs", { message });
});
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.use("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.listen(2022);
