const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const UserDb = require("../models/UserSchema");
const authenticate = require("../middleware/authenticate");

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

// user login
router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      error: "Fill all the details!",
    });
  }

  try {
    const userValid = await UserDb.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        return res.status(422).json({ error: `Invalid details` });
      } else {
        // token generate
        const token = await userValid.generateAuthtoken();
        // console.log(token);

        // cookie generate
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });

        const result = {
          userValid,
          token,
        };

        return res.status(201).json({ status: 201, result });
      }
    }
  } catch (err) {
    return res.status(401).json(error);
  }
});

// user valid
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validUserOne = await UserDb.findOne({ _id: req.userId });
   return res.status(201).json({status: 201, validUserOne})
  } catch (err) {
    return res.status(401).json({
      status: 401,
      err,
    });
  }
});

module.exports = router;
