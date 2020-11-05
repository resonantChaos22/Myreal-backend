const db = require("../db/models/db");

module.exports.createUser = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
  db.models.users
    .create({
      image_url: req.body.image_url,
      //   email: req.body.email,
      //   name: req.body.name,
      //   date_of_birth: req.body.date_of_birth,
      //   age: req.body.age,
      //   phone: req.body.phone,
      //   marital_status: req.body.marital_status,
      //   children_count: req.body.children_count,
      //   city: req.body.city,
      //   bio: req.body.bio,
      //   children_count: req.body.children_count,
    })
    .then((newUser) => res.send(newUser));
};

module.exports.getAllUsers = async (req, res) => {
  try {
    db.models.users
      .findAll({
        include: [
          db.models.education,
          db.models.experience,
          db.models.job_qs,
          db.models.personal_qs,
          db.models.workplace_qs,
          db.models.skills,
          db.models.jobs,
          db.models.subUsers,
          db.models.resumes,
          db.models.documents,
          db.models.background_ds,
        ],
      })
      .then((allUsers) => res.send(allUsers));
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    db.models.users
      .findOne({
        where: {
          id: req.user.id,
        },
        include: [
          db.models.education,
          db.models.experience,
          db.models.job_qs,
          db.models.personal_qs,
          db.models.workplace_qs,
          db.models.skills,
          db.models.jobs,
          db.models.subUsers,
          db.models.resumes,
          db.models.documents,
          db.models.background_ds,
        ],
      })
      .then((foundUser) => res.status(200).send(foundUser));
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
