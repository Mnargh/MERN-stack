const express = require('express')
const router = express.Router();

// @route           GET api/profile
// @description     auth route
// @access          public 
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;