const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const UserDb = require("../models/UserSchema");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const keysecret = process.env.JWT_SECRET;

// email config for reset password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

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
    return res.status(201).json({ status: 201, validUserOne });
  } catch (err) {
    return res.status(401).json({
      status: 401,
      err,
    });
  }
});

// user logout
router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((currEle) => {
      return currEle.token !== req.token;
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    return res
      .status(201)
      .json({ status: 201, message: "User logout successful" });
  } catch (err) {
    return res.status(401).json({ status: 401, err });
  }
});

// send email link for reset password
router.post("/sendpasswordlink", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res
      .status(401)
      .json({ status: 401, message: "Enter your email properly!" });
  }

  try {
    const userFind = await UserDb.findOne({ email: email });
    // console.log(userFind);

    // token generate for reset password
    const token = jwt.sign({ _id: userFind._id }, keysecret, {
      expiresIn: "120s",
    });

    // console.log(token);

    const setUserToken = await UserDb.findByIdAndUpdate(
      { _id: userFind._id },
      { verifytoken: token },
      { new: true }
    );

    // console.log(`setUsertoken `, setUserToken);

    if (setUserToken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending email for password reset",
        text: `This link valid for 2 minutes http://localhost:3000/forgotpassword/${userFind._id}/${setUserToken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res
            .status(401)
            .json({ status: 401, message: "email not send" });
        } else {
          console.log(`email sent: `, info.response);
          return res
            .status(201)
            .json({ status: 201, message: "email sent successful" });
        }
      });
    }
  } catch (err) {
    return res.status(401).json({ status: 401, message: "Invalid user" });
  }
});

module.exports = router;
