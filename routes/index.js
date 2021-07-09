const { Router } = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const router = Router();

/**
 * @desc Login/Landing page
 * @route GET /
 */
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

/**
 * @desc Dashboard
 * @route GET /dashboard
 */
router.get("/dashboard", ensureAuth, (req, res) => {
  console.log(req.user);
  res.render("dashboard", {
    name: req.user.first_name,
  });
});

module.exports = router;
