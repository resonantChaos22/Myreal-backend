const config = require("../config/config");
const db = require("../db/models/db");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports.signIn = async (req, res) => {
  try {
    console.log("Login");

    const userEmail = req.user.email;
    const userImage = req.user.image_url;
    const userName = req.user.name;

    let user = await db.models.users.findOne({
      where: {
        email: userEmail,
      },
      attributes: ["id", "email", "image_url", "created_at", "login_type"],
    });

    if (user) {
      // The user has already signed-in through google
      // The payload of the auth-token
      if (user.login_type === "linkedin") {
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
        // console.log(user)
        // console.log('Already exists.')
        // console.log(user.new_user);
        return res.status(200).json({
          success: true,
          authToken: token,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `Account exists in ${user.login_type}`,
        });
      }
    } else if (!user) {
      return res.status(401).json({
        success: false,
        reason: "User does not exist",
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

module.exports.signUp = async (req, res) => {
  try {
    console.log("Signup");

    const userEmail = req.user.email;
    const userImage = req.user.image_url;
    const userName = req.user.name;

    let user = await db.models.users.findOne({
      where: {
        email: userEmail,
      },
      attributes: ["id", "email", "image_url", "created_at", "login_type"],
    });

    if (!user) {
      // Create a new user
      var create_object = {
        email: userEmail,
        name: userName,
        image_url: userImage,
        login_type: "linkedin",
      };

      db.models.users
        .create(create_object)
        .then((login_data) => {
          // The payload of the auth-token
          var auth_data = {
            email: login_data.email,
            image_url: login_data.image_url,
            id: login_data.id,
            created_at: login_data.created_at,
            role: "candidate",
          };
          // Create and assign an auth-token
          const TOKEN_SECRET = config.app.jwtKey;
          // var token = jwt.sign(auth_data, TOKEN_SECRET, { expiresIn: (amount of time for storing jwt token)})
          var token = jwt.sign(auth_data, TOKEN_SECRET);
          return res.status(200).json({
            success: true,
            authToken: token,
          });
        })
        .catch((e) => {
          console.log(e);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: e.message,
          });
        });
    } else if (user) {
      return res.status(500).json({
        success: false,
        reason: "User already exists with the given email address",
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

module.exports.continue = async (req, res) => {
  try {
    const code = req.body.code;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios.post(
      "www.linkedin.com/oauth/v2/accessToken",
      (params = {
        grant_type: "authorization_code",
        code,
        redirect_uri: config.linkedin.CALLBACK_URI,
        client_id: config.linkedin.CLIENT_ID,
        client_secret: config.linkedin.CLIENT_SECRET,
      }),
      headers
    );
    if (!accessToken) {
      res.status(405).json({
        success: false,
        message: "No data received",
      });
    }
    console.log(response);
    const accessToken = response.access_token;

    const user = await axios.get("http://api.linkedin.com/v2/jobs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(405).json({
        success: false,
        message: "No data received",
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
