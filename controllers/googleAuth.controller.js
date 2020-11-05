var { OAuth2Client } = require("google-auth-library");
var jwt = require("jsonwebtoken");

var config = require("../config/config");
var db = require("../db/models/db");

// The following code is currently unchecked. Can only be done once front-end integrates googleAuth or if backend gets a test idToken.

// Google authentication will now be done in front-end. Front-end will return an idToken which will be used to authenticate with the backend.
module.exports.signIn = async (req, res) => {
  try {
    //const CLIENT_ID = '498233300103-3p9u6r2rmlru42i40d421ju1ljosdca9.apps.googleusercontent.com'
    const CLIENT_ID = config.google.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const idToken = req.body.idToken;
    if (idToken) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: idToken,
          audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        // get the data from google
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        const userEmail = payload["email"];
        const userName = payload["name"];
        const userImage = payload["picture"];
        // check if the user already exists in our database
        let user = await db.models.users.findOne({
          where: {
            email: userEmail,
          },
          attributes: ["id", "email", "image_url", "created_at", "login_type"],
        });
        // console.log(user);
        if (user) {
          // The user has already signed-in through google
          // The payload of the auth-token
          if (user.login_type === "google") {
          } else {
            res.status(200).json({
              success: false,
              message: `Account exists in ${user.login_type}`,
            });
          }

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
        } else if (!user) {
          return res.status(500).json({
            success: false,
            reason: "User does not exist",
          });
        }
      } catch (e) {
        // console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal server error.",
          error: e.message,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "Idtoken not found.",
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

module.exports.signUp = async (req, res) => {
  try {
    const CLIENT_ID = config.google.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const idToken = req.body.idToken;
    if (idToken) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: idToken,
          audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        // get the data from google
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        const userEmail = payload["email"];
        const userName = payload["name"];
        const userImage = payload["picture"];
        // check if the user already exists in our database
        let user = await db.models.users.findOne({
          where: {
            email: userEmail,
          },
          attributes: ["id", "email", "image_url", "created_at"],
        });
        // console.log(user);
        if (!user) {
          // Create a new user
          var create_object = {
            email: userEmail,
            name: userName,
            image_url: userImage,
            login_type: "google",
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
              // console.log(login_data)
              // console.log('new user')
              // console.log(login_data.new_user);
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
        return res.status(500).json({
          success: false,
          message: "Internal server error.",
          error: e.message,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "Idtoken not found.",
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
  //const CLIENT_ID = '498233300103-3p9u6r2rmlru42i40d421ju1ljosdca9.apps.googleusercontent.com'
};

module.exports.continue = async (req, res) => {
  try {
    const CLIENT_ID = config.google.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const idToken = req.body.idToken;
    if (idToken) {
      try {
        const ticket = await client.verifyIdToken({
          idToken: idToken,
          audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        // get the data from google
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        const userEmail = payload["email"];
        const userName = payload["name"];
        const userImage = payload["picture"];
        // check if the user already exists in our database
        let user = await db.models.users.findOne({
          where: {
            email: userEmail,
          },
          attributes: ["id", "email", "image_url", "created_at"],
        });
        // console.log(user);
        if (!user) {
          // Create a new user
          var create_object = {
            email: userEmail,
            name: userName,
            image_url: userImage,
            login_type: "google",
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
              // console.log(login_data)
              // console.log('new user')
              // console.log(login_data.new_user);
              return res.status(200).json({
                success: true,
                authToken: token,
                newUser: false,
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
          if (user.login_type === "google") {
          } else {
            res.status(405).json({
              success: false,
              message: `Account exists in ${user.login_type}`,
            });
          }

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
            newUser: false,
          });
        }
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          success: false,
          message: "Internal server error.",
          error: e.message,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "Idtoken not found.",
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
  //const CLIENT_ID = '498233300103-3p9u6r2rmlru42i40d421ju1ljosdca9.apps.googleusercontent.com'
};
