const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const creds = require("../../config/creds");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

const getDataFromLinkedin = require("../../utils/getDataFromLinkedin");

router.post("/register", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    // Get data from linkedin
    const linkedin_url = req.body.linkedin_url;
    const linkedin_data = await getDataFromLinkedin(linkedin_url);

    console.log("LINKEDIN:- ", linkedin_url);
    console.log("LINKEDIN:- ", linkedin_data);


    // If does not exist, create new user
    const newUser = new User({
      email: req.body.email,
      linkedin_url: req.body.linkedin_url,
      password: req.body.password,
      // linkedin data
      username: linkedin_data.public_identifier,
      profile_pic: linkedin_data.profile_pic_url,
      first_name: linkedin_data.first_name,
      last_name: linkedin_data.last_name,
      headline: linkedin_data.headline,
      summary: linkedin_data.summary,
      country: linkedin_data.country,
      city: linkedin_data.city,
      state: linkedin_data.state,
      education: linkedin_data.education,
      experience: linkedin_data.experiences,
      certifications: linkedin_data.certifications,
      phone: "",
      birthday: "",
      age: "",
      is_freelancer: false,
      github: "",
      cover_image:
        "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    });

    // Hashing password before saving in database
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    console.log(linkedin_data);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ emailnotfound: "User not found in our database!!" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
    // Return jsonwebtoken
    const payload = {
      id: user.id,
      linkedin_url: user.linkedin_url,
      email: user.email,
    };
    jwt.sign(
      payload,
      creds.secretOrKey,
      {
        expiresIn: 31556926, // 1 year in seconds
      },
      (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
          email: user.email,
          username: user.username,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Server error" });
  }
});

router.get("/user/:username", async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.params.username });
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernotfound: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: "Server error" });
  }
});

router.put(
  "/user/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find user by username
      const user = await User.findOne({ username: req.params.username });
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernotfound: "User not found" });
      }
      // Update user
      const updatedUser = await User.findOneAndUpdate(
        { username: req.params.username },
        req.body,
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
