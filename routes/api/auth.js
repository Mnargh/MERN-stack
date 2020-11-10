const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
// @route           GET api/auth
// @description     auth route
// @access          public
router.get('/', auth, async (req, res) => {
  try {
    // need to import and find the exact User
    // since this is protected route, and we used the token which has an id
    // and in middleware we set req.user to the user in the token, we can access that in a protected route to get the id
    // don't want to return the password, so add a select for without password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route           POST api/auth
// @description     Authenticate user and get token
// @access          public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists, if not send error
      let user = await User.findOne({ email });
      // check to see if a user, if not, send an error message
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // compare takes first param password, which is what plaintext password user has entered
      // second is encrypted password we get from user we got from rquesting to the db to get the user
      const isMatch = await bcrypt.compare(password, user.password);

      // check to see if there is a match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
        // for security reasons, need to keep message the same if user not found or password wrong for security reasons
      }

      // Return jsonwebtoken
      // get payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      // sign token, passing in payload and secret
      // required to be logged in straight away
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// always need to export the router
module.exports = router;
