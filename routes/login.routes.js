const express = require("express");
const validate = require("../functions/validateFunc");
const googleAuth = require("../controllers/googleAuth.controller");
const emailAuth = require("../controllers/emailAuth.controller");
const linkedInAuth = require("../controllers/linkedInAuth.controller");
const passport = require("passport");
const linkedInPassport = require("../functions/linkedInPassport");

const router = express.Router();

// router.post("/email", validate.email, verifyEmailCtrl.sendMailforVerification);

router.post("/google", googleAuth.signIn);
router.post("/email", emailAuth.signIn);
router.post("/client/email", emailAuth.login_client);

router.get(
  "/linkedin",
  linkedInPassport.login,
  passport.authenticate("linkedin", { state: "SOME STATE", session: false })
);

router.get(
  "/linkedin/callback",
  linkedInPassport.login,
  passport.authenticate("linkedin", {
    session: false,
  }),
  linkedInAuth.signIn
);

module.exports = router;
