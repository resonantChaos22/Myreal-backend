const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const sendEmail = require("../functions/sendMail").sendEmail;
const db = require("../db/models/db");

module.exports.sendMailforVerification = async (req, res) => {
  try {
    const userEmail = req.email;
    let token = Math.floor(Math.random() * Math.pow(10, 12)) + Math.pow(10, 11);
    db.models.tokens
      .create({
        email: userEmail,
        token: token.toString(),
        role: "candidate",
      })
      .then((newToken) => console.log(newToken));
    link1 = "http://localhost:3000/setPassword?token=" + token.toString();
    link2 = "https://dev.zunavish.com/setPassword?token=" + token.toString();
    const htmlString = `Hello,<br> Please Click on the link to verify your email.<br><a href="${link1}">Click here to verify(localhost)</a><br><a href="${link2}">Click here to verify(deployed)</a>`;
    await sendEmail(userEmail, htmlString, (result) => {
      console.log(result);
      if (result) {
        return res.status(200).json({
          success: "true",
          message: `Email sent to ${userEmail}`,
        });
      } else {
        return res.status(200).json({
          success: "false",
          message: `Email not sent!!`,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.invite = async (req, res) => {
  try {
    const userEmail = req.email;
    const role = req.body.role;
    let token = Math.floor(Math.random() * Math.pow(10, 12)) + Math.pow(10, 11);
    db.models.tokens
      .create({
        email: userEmail,
        token: token.toString(),
        role,
      })
      .then((newToken) => console.log(newToken));
    link1 = "http://localhost:3000/setPassword?token=" + token.toString();
    link2 = "https://zunavish-client.web.app/setPassword?token=" + token.toString();
    const htmlString = `Hello,<br> Please Click on the link to verify your email.<br><a href="${link1}">Click here to verify(localhost)</a><br><a href="${link2}">Click here to verify(deployed)</a>`;
    await sendEmail(userEmail, htmlString, (result) => {
      console.log(result);
      if (result) {
        return res.status(200).json({
          success: "true",
          message: `Email sent to ${userEmail}`,
        });
      } else {
        return res.status(200).json({
          success: "false",
          message: `Email not sent!!`,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.signUp = async (req, res) => {
  try {
    const emailToken = req.body.token;
    console.log(emailToken);
    const password = req.password;
    db.models.tokens
      .findOne({
        where: {
          token: emailToken,
        },
      })
      .then((foundToken) => {
        console.log(foundToken);
        if (foundToken.role !== "candidate")
          res.status(405).json({
            success: false,
            message: "Invalid role in token",
          });
        const email = foundToken.email;
        if (emailValidator.validate(email)) {
          bcrypt.hash(password, 12).then((hash) => {
            const password_hash = hash;
            let create_object = {
              email,
              password_hash,
              login_type: "email",
            };
            db.models.users.create(create_object).then((login_data) => {
              // The payload of the auth-token
              var auth_data = {
                email: login_data.email,
                id: login_data.id,
                created_at: login_data.created_at,
                role: "candidate",
              };
              // Create and assign an auth-token
              const TOKEN_SECRET = config.app.jwtKey;
              // var token = jwt.sign(auth_data, TOKEN_SECRET, { expiresIn: (amount of time for storing jwt token)})
              var token = jwt.sign(auth_data, TOKEN_SECRET);
              // console.log(login_data)
              // console.log('new user')
              // console.log(login_data.new_user);
              return res.status(200).json({
                success: true,
                authToken: token,
              });
            });
          });
        } else {
          return res.status(405).json({
            validated: false,
            email: email,
            reason: "Wrong format",
          });
        }
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const password = req.body.password;
    const userEmail = req.body.email;

    let user = await db.models.users.findOne({
      where: {
        email: userEmail,
      },
      attributes: [
        "id",
        "email",
        "image_url",
        "created_at",
        "password_hash",
        "login_type",
      ],
    });
    // console.log(user);
    if (user) {
      if (user.login_type === "email") {
        bcrypt.compare(password, user.password_hash).then((result) => {
          if (result) {
            var auth_data = {
              email: user.email,
              id: user.id,
              image_url: user.image_url,
              created_at: user.created_at,
              role: "candidate",
            };
            // Create and assign an auth-token
            const TOKEN_SECRET = config.app.jwtKey;
            var token = jwt.sign(auth_data, TOKEN_SECRET);

            return res.status(200).json({
              success: true,
              authToken: token,
            });
          } else {
            return res.status(200).json({
              success: false,
              message: "Password incorrect",
            });
          }
        });
      } else {
        res.status(405).json({
          success: false,
          message: `Account exists in ${user.login_type}`,
        });
      }
    } else if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.login_client = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      authToken: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
