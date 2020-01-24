//
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if no token i.e. route is protected from the user
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // take request object and assign a value to the user
    req.user = decoded.user;
    next(); // called in any middleware to skip to next middleware
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
// has access to req and res objects
// has callback function next we have to run when done so it moves onto the next piece of middleware
