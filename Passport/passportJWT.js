const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const config = require("../config/config");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: (req) => req.headers.token,
      secretOrKey: config.app.jwtKey,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);
