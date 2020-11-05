const db = require("../db/models/db");

module.exports.subUser = async (userId, cb) => {
  try {
    db.models.users
      .findOne({
        where: {
          id: userId,
        },
      })
      .then((foundUser) => {
        db.models.subUsers
          .create({
            image_url: foundUser.image_url,
            email: foundUser.email,
            name: foundUser.name,
            date_of_birth: foundUser.date_of_birth,
            age: foundUser.age,
            phone: foundUser.phone,
            marital_status: foundUser.marital_status,
            children_count: foundUser.children_count,
            city: foundUser.city,
            bio: foundUser.bio,
            designation: foundUser.designation,
            resumeUrl: foundUser.resume_url,
            UserId: userId,
          })
          .then((newSubUser) => {
            console.log(newSubUser);
            cb(newSubUser.id, null);
          })
          .catch((e) => {
            console.log(e);
            cb(null, e);
          });
      })
      .catch((e) => {
        console.log(e);
        cb(null, e);
      });
  } catch (err) {
    console.log(err);
    cb(null, err);
    // return false;
  }
};
