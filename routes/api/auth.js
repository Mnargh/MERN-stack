const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
// @route           GET api/auth
// @description     auth route
// @access          public
router.get("/", auth, async (req, res) => {
  try {
    // need to import and find the exact User
    // since this is protected route, and we used the token which has an id
    // and in middleware we set req.user to the user in the token, we can access that in a protected route to get the id
    // don't want to return the password, so add a select for without password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// always need to export the router
module.exports = router;
