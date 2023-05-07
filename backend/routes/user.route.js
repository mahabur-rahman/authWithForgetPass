const express = require("express");
const router = new express.Router();
const UserDb = require("../models/UserSchema");

// registration
router.post("/register", async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    return res.status(422).json({
      error: "fill all the field!",
    });
  }

  try {
    const preUser = await UserDb.findOne({ email: email });

    if (preUser) {
      return res.status(422).json({
        error: "Email already exist!",
      });
    } else if (password !== cpassword) {
      return res.status(422).json({
        error: "password and confirm password not match",
      });
    } else {
      const finalUser = new UserDb({
        fname,
        email,
        password,
        cpassword,
      });

      // here password hash

      const storeData = await finalUser.save();

      return res.status(201).json({ status: 201, storeData });
    }
  } catch (err) {
    return req.status(422).json(err);
  }
});

module.exports = router;
