const db = require("../../db/models/db");

let crud = {};
crud.add = async (req, res) => {
  try {
    if (!req.body) {
      res.status(405).json({
        success: false,
        message: "No data sent",
      });
    }
    db.models.users
      .create(req.body)
      .then((newUser) => {
        if (!newUser)
          res.status(401).json({
            success: true,
            message: "User not found",
          });
        else {
          console.log(newUser);
          res.status(200).json({
            success: true,
            message: `New User created with id ${newUser.id}`,
            newUser,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          success: false,
          message: "Internal Database Error",
          error: e.message,
        });
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

crud.getAll = async (req, res) => {
  try {
    db.models.users
      .findAll({
        include: [db.models.stories],
      })
      .then((allUsers) => {
        if (Array.isArray(allUsers) && allUsers.length) {
          res.status(200).json({
            success: true,
            allUsers,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "No users found",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
          error: e.message,
        });
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

crud.get = async (req, res) => {
  try {
    db.models.users
      .findOne({
        where: {
          id: req.query.id,
        },
        include: [db.models.stories],
      })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(401).json({
            success: false,
            message: "User not found",
          });
        } else {
          console.log(foundUser);
          res.status(200).json({
            success: true,
            foundUser,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({
          success: false,
          message: "Internal Database Error",
          error: e.message,
        });
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
crud.update = async (req, res) => {
  try {
    if (req.body.id) {
      db.models.users
        .findOne({
          where: {
            id: req.body.id,
          },
        })
        .then((foundUser) => {
          if (!foundUser) {
            res.status(405).json({
              success: false,
              message: "No User found",
            });
          } else {
            db.models.users
              .update(req.body, {
                where: {
                  id: foundUser.id,
                },
              })
              .then((result) => {
                if (result) {
                  res.status(200).json({
                    success: true,
                    message: "User updated!",
                  });
                } else {
                  res.status(500).json({
                    success: true,
                    message: "Internal Server Error",
                  });
                }
              })
              .catch((e) => {
                console.log(e);
                res.status(500).send({
                  success: false,
                  message: "Internal Server Error",
                  error: e.message,
                });
              });
          }
        })
        .catch((e) => {
          console.log(e);
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: e.message,
          });
        });
    } else {
      res.status(401).send({
        success: false,
        message: "Id not given",
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
crud.delete = async (req, res) => {
  try {
    db.models.users
      .findOne({
        where: {
          id: req.body.id,
        },
      })
      .then((foundUser) => {
        console.log(foundUser);
        if (foundUser)
          foundUser.destroy().then(() => {
            res.status(200).json({
              success: true,
              message: "User deleted successfully",
            });
          });
        else {
          res.status(401).send({
            success: false,
            message: "User Not Found",
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

module.exports = crud;
