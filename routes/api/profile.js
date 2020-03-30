const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route           GET api/profile/me
// @description     Get current users profile
// @access          private - getting profile by user id in the token, so they have to use the token
router.get('/me', auth, async (req, res) => {
  try {
    console.log(req.user.id)
    console.log(Profile.findOne({ user: req.user.id }))
    // brings in profile
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    // check to see if there is no profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
