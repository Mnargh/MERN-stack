const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route           GET api/profile/me
// @description     Get current users profile
// @access          private - getting profile by user id in the token, so they have to use the token
router.get("/", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: res.user.id })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

module.exports = router;
