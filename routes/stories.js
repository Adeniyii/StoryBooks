const { Router } = require("express");
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");
const router = Router();

/**
 * @desc Show add page
 * @route GET /stories/add
 */
router.get("/add", ensureAuth, (req, res) => {
  return res.render("stories/add");
});

/**
 * @desc Process add form
 * @route POST /stories/add
 */
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

/**
 * @desc Show all stories
 * @route GET /stories
 */
router.get("/", ensureAuth, async (req, res) => {
  try {
    const story = await Story.find({ status: "public" })
      .populate("user")
      .sort({ created_at: "desc" })
      .lean();
    return res.render("stories/index", {
      story,
    });
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

/**
 * @desc Show edit page
 * @route GET /stories/edit/:id
 */
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();
    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      return res.redirect("/stories");
    } else {
      return res.render("stories/edit", { story });
    }
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});

/**
 * @desc Update story
 * @route PUT /stories/:id
 */
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      return res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
    return res.render("error/500");
  }
});
module.exports = router;
