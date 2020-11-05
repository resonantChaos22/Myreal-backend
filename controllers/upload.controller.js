const S3 = require("../S3");
const fs = require("fs");
const FileType = require("file-type");
const multiparty = require("multiparty");
const db = require("../db/models/db");

module.exports.profileImage = async (req, res) => {
  try {
    const user = await db.models.users.findOne({
      where: {
        // id: 1,
        id: req.user.id,
      },
    });
    if (!user)
      res.status(401).json({
        success: false,
        message: "User not found!",
      });

    const form = new multiparty.Form();
    form.parse(req, async (e, fields, files) => {
      if (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
          error: e.message,
        });
      }
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);

        const type = await FileType.fromBuffer(buffer);

        if (!type)
          res.status(405).json({
            success: false,
            message: "File type not supported",
          });
        const acepted_formats = ["jpg", "jpeg", "png"];
        if (acepted_formats.indexOf(type.ext) === -1)
          res.status(405).json({
            success: false,
            message: "File type not supported",
          });
        const fileName = `profileImage/${Date.now().toString()}`;
        const data = await S3.uploadFile(buffer, fileName, type);
        db.models.users
          .update(
            {
              image_url: data.Location,
            },
            {
              where: {
                id: user.id,
              },
            }
          )
          .then(async (updatedUserId) => {
            const updatedUser = await db.models.users.findOne({
              where: {
                id: updatedUserId,
              },
            });
            console.log(updatedUser);
            res.status(200).json({
              success: true,
              message: `User has profile image with link ${updatedUser.image_url}`,
              link: data.Location,
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(500).send({
              success: false,
              error: e.message,
            });
          });
      } catch (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          error: e.message,
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

module.exports.removeProfileImage = async (req, res) => {
  try {
    const user = await db.models.users.findOne({
      where: {
        // id: 1,
        id: req.user.id,
      },
    });
    if (!user)
      res.status(401).json({
        success: false,
        message: "User not found!",
      });
    if (!user.image_url) {
      res.status(405).json({
        success: false,
        message: "No Image",
      });
    }
    db.models.users
      .update(
        { image_url: null },
        {
          where: {
            id: user.id,
          },
        }
      )
      .then((x) => {
        res.status(200).json({
          success: true,
          message: "Removed pic",
        });
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

module.exports.resume = async (req, res) => {
  try {
    const user = await db.models.users.findOne({
      where: {
        // id: 1,
        id: req.user.id,
      },
    });
    if (!user)
      res.status(401).json({
        success: false,
        message: "User not found!",
      });

    const form = new multiparty.Form();
    form.parse(req, async (e, fields, files) => {
      if (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
          error: e.message,
        });
      }
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);

        const type = await FileType.fromBuffer(buffer);

        if (!type)
          res.status(405).json({
            success: false,
            message: "File type not supported",
          });

        const acepted_formats = ["jpg", "jpeg", "png", "pdf"];
        if (acepted_formats.indexOf(type.ext) === -1)
          res.status(405).json({
            success: false,
            message: "File type not supported",
          });
        const fileName = `resumes/${Date.now().toString()}`;
        const data = await S3.uploadFile(buffer, fileName, type);
        if (data) {
          res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            data,
          });
        } else {
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          error: e.message,
          message: "Internal Server Error",
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

module.exports.logo = async (req, res) => {
  try {
    const client = await db.models.clients.findOne({
      where: {
        // id: 1,
        id: req.user.id,
      },
    });
    if (!client)
      res.status(401).json({
        success: false,
        message: "Client not found!",
      });

    const form = new multiparty.Form();
    form.parse(req, async (e, fields, files) => {
      if (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
          error: e.message,
        });
      }
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);

        const type = await FileType.fromBuffer(buffer);

        if (!type)
          res.status(405).json({
            success: false,
            message: "File type not supported",
          });
        const acepted_formats = ["jpg", "jpeg", "png"];
        if (acepted_formats.indexOf(type.ext) === -1)
          res.status(405).json({
            success: false,
            message: "File type not supported",
          });
        const fileName = `logos/${Date.now().toString()}`;
        const data = await S3.uploadFile(buffer, fileName, type);
        db.models.organizations
          .update(
            {
              logo_url: data.Location,
            },
            {
              where: {
                id: client.organizationId,
              },
            }
          )
          .then(async (updatedOrgId) => {
            const updatedOrg = await db.models.organizations.findOne({
              where: {
                id: updatedOrgId,
              },
            });
            console.log(updatedOrg);
            res.status(200).json({
              success: true,
              message: `Organisation has logo with link ${data.Location}`,
              link: data.Location,
            });
          })
          .catch((e) => {
            console.log(e);
            res.status(500).send({
              success: false,
              error: e.message,
            });
          });
      } catch (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          error: e.message,
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
