const express = require('express')
const router = express.Router();

// @route           GET api/auth
// @description     auth route
// @access          public 
router.get('/', (req, res) => res.send('Auth route'));


// always need to export the router
module.exports = router;