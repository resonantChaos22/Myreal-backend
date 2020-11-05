const jwt = require("jsonwebtoken");
const config = require("../config/config");
const passport = require("passport");

module.exports.authenticateToken = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  // if (token === null) return res.sendStatus(401);

  // jwt.verify(token, config.app.jwtKey, (err, user) => {
  //   if (err) res.sendStatus(403);
  //   req.user = user;
  //   next();
  // });
  passport.authenticate("jwt", { session: false });
  const token = req.headers.token;
  if (!token) {
    console.log(req);
    return res.status(401).json({
      success: false,
      error: "Access denied. No token found.",
    });
  }
  try {
    const auth_data = jwt.verify(token, config.app.jwtKey);
    req.user = auth_data;
    console.log(auth_data);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Unauthorised",
    });
  }
};
