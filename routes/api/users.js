const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// importing User model
const User = require("../../models/User");

// @route           POST api/users
// @description     Register user
// @access          public
// (if need a token to access specific route) will creating authenticaition later
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne().then();

    // See if user exists, if not send error
    const { name, email, password } = req.body;

    try {
      // Get user's gravitar
      // Encrypt password
      // Return jsonwebtoken
      // required to be logged in straight away
    } catch (error) {}

    res.send("User route");
  }
);

module.exports = router;
