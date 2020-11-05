const passport = require("passport");
const config = require("../config/config");

module.exports.login = async (req, res, next) => {
  require("../Passport/passportLinkedIn")(
    passport,
    config.linkedin.LOGIN_CALLBACK_URL
  );
  next();
};

module.exports.signup = async (req, res, next) => {
  require("../Passport/passportLinkedIn")(
    passport,
    config.linkedin.SIGNUP_CALLBACK_URL
  );
  next();
};
