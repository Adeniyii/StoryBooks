const { Router } = require("express");
const passport = require("passport");
const router = Router();

/**
 * @desc Auth with facebook
 * @route GET /auth/facebook
 */
router.get(
  "/facebook",
  passport.authenticate("facebook")
  // passport.authenticate("facebook")
);

/**
 * @desc Facebook auth callback
 * @route GET /auth/facebook/callback
 */
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

/**
 * @desc Logout user
 * @route GET /auth/logout
 */
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
