const GoogleStrategy = require("passport-google-oauth20").Strategy;

const config = require("../config/config");
const db = require("../db/models/db");
const User = db.models.users;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.CLIENT_ID,
        clientSecret: config.google.CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = {
          email: profile.emails[0].value,
          name: profile.displayName,
          image_url: profile.photos[0].value,
        };
        console.log(user);
        return done(null, user);
      }
    )
  );
};
