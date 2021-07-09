module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};