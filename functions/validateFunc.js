const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

const emailValidator = require("email-validator");
const config = require("../config/config");
const db = require("../db/models/db");

module.exports.email = async (req, res, next) => {
  try {
    if (!req) {
      return res.status(500).json({
        success: false,
        error: "Internal server error.",
      });
    }
    const userEmail = req.body.email;
    db.models.users
      .findOne({
        where: {
          email: userEmail,
        },
      })
      .then((user) => {
        if (user) {
          return res.status(200).json({
            validated: false,
            message: "Email already exists in the database",
          });
        } else {
          // var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if (emailValidator.validate(userEmail)) {
            req.email = userEmail;
            next();
          } else {
            return res.status(200).json({
              validated: false,
              reason: "Wrong email format",
            });
          }
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.password = async (req, res, next) => {
  try {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const passwordSchema = new passwordValidator();

    passwordSchema
      .is()
      .min(8)
      .is()
      .max(100)
      .has()
      .uppercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces();

    if (password === confirmPassword) {
      success = passwordSchema.validate(password);
      if (success) {
        req.password = password;
        next();
      } else {
        res.status(200).json({
          success: false,
          reason: `Pasword not in the correct format`,
        });
      }
    } else {
      res.status(500).json({
        success: false,
        reason: "Passwords do not match",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.educationDetails = async (req, res, next) => {
  try {
    const user = await db.models.users.findOne({
      where: {
        id: 2,
        // id: req.user.id,
      },
      include: [db.models.education],
    });
    console.log(user);
    let data = req.body;
    for (let i = 0; i < Object.keys(data).length; i++) {
      educationData = data[String(i)];
      if (user.Education) {
        console.log("new Education");
        next();
      } else {
        for (let j = 0; j < user.Education.length; j++) {
          if (
            user.Education[j].start_year === educationData.start_year &&
            user.Education[j].grad_year === educationData.grad_year
          ) {
            console.log(j);
            res.status(500).json({
              validated: false,
              message: "Start year and end year are same",
            });
            break;
          } else {
            next();
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
