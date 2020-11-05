const express = require("express");

const router = express.Router();

const userRoutes = require("./user.routes");
// const signUpRoutes = require("./signup.routes");
// const logInRoutes = require("./login.routes");

router.use("/users/", userRoutes);
// router.use("/signup", signUpRoutes);
// router.use("/login", logInRoutes);

router.post("/test", async (req, res) => {
  let data = req.body;
  res.send(data);
});

module.exports = router;
