const express = require('express')
const router = express.Router();

// @route           GET api/posts
// @description     auth route
// @access          public 
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;