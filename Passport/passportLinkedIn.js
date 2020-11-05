const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const config = require("../config/config");
const db = require("../db/models/db");

module.exports = (passport, cb) => {
  console.log(cb);
  passport.use(
    "linkedin",
    new LinkedInStrategy(
      {
        clientID: config.linkedin.CLIENT_ID,
        clientSecret: config.linkedin.CLIENT_SECRET,
        callbackURL: cb,
        scope: ["r_emailaddress", "r_liteprofile"],
      },
      // linkedin sends back the tokens and progile info
      async (token, tokenSecret, profile, done) => {
        const user = {
          name: profile.displayName,
          image_url: profile.photos[3].value,
          email: profile.emails[0].value,
        };
        console.log(user);
        return done(null, user);
      }
    )
  );
};
