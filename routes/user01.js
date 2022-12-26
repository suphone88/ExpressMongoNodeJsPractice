//const express = require("express");
//const router = express.Router();

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "All users" });
});
router.post("/", (req, res) => {
  res.json(req.body);
});

module.exports = router;
