var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

var db = require("./db/db");

let retries = 5;
while (retries) {
  try {
    db.connectDb();
    break;
  } catch (err) {
    console.log(err);
    retries -= 1;
    console.log(`Retries left: ${retries}`, (res) => setTimeout(res, 5000));
  }
}

var app = express();

// require("./Passport/passportGoogle");
// require("./Passport/passportJWT");

const router = require("./routes/index.routes");
var corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": "*",
};
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/api/v1", router);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Myreal!",
  });
});

module.exports = app;
