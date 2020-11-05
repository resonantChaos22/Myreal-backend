const express = require("express");
const emailAuth = require("../controllers/emailAuth.controller");
const validate = require("../functions/validateFunc");
const googleAuth = require("../controllers/googleAuth.controller");
const linkedInAuth = require("../controllers/linkedInAuth.controller");
const passport = require("passport");
const linkedInPassport = require("../functions/linkedInPassport");

const router = express.Router();

router.post("/email", validate.email, emailAuth.sendMailforVerification);

router.post("/email/check_password", validate.password, emailAuth.signUp);

router.post("/google", googleAuth.signUp);

router.get(
  "/linkedin",
  linkedInPassport.signup,
  passport.authenticate("linkedin", { state: "SOME STATE", session: false })
);

router.get(
  "/linkedin/callback",
  linkedInPassport.signup,
  passport.authenticate("linkedin", {
    session: false,
  }),
  linkedInAuth.signUp
);

// router.get("/verify_email", emailAuth.verifyEmail);

module.exports = router;
