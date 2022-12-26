const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "All Posts" });
});

router.get("/:id", (req, res) => {
  res.json({ msg: "Get post id is" + id });
});

router.post("/", (req, res) => {
  res.json(req.body);
});

module.exports = router;
