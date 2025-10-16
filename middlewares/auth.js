function checkRole(role) {
  return (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== role) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
}
// om shahane
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "login first");
    return res.redirect("/login");
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "Admin") return next();
  res.status(403).send("Access Denied: Admins Only");
}
function isOwner(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "Owner") return next();
  res.status(403).send("Access Denied: Owner Only");
}
function isEmployer(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "Employer") return next();
  res.status(403).send("Access Denied: Employers Only");
}

function saveRedirectUrl(req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}
function isJobSeeker(req, res, next) {
  if (req.user && req.user.role === "JobSeeker") {
    return next();
  }
  res.redirect("/");
}
function isCEO(req, res, next) {
  if (req.user && req.user.role === "CEO") {
    return next();
  }
  res.redirect("/ceo");
}
module.exports = {
  checkRole,
  isLoggedIn,
  isAdmin,
  isEmployer,
  saveRedirectUrl,
  isJobSeeker,
};
