const express = require("express");
const router = new express.Router();

// registration
router.post("/register", (req, res) => {
  res.send("register user");
});

module.exports = router;
