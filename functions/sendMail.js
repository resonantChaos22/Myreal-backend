const nodemailer = require("nodemailer");

var transporter;

async function nodeMailerAccount() {
  var smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL,
    // you can try with TLS, but port is then 587
    auth: {
      user: process.env.GMAIL_ID, // Your email id
      pass: process.env.GMAIL_PASSWORD, // Your password
    },
  };
  transporter = nodemailer.createTransport(smtpConfig);
}

nodeMailerAccount();

module.exports.sendEmail = async (email, htmlString, cb) => {
  try {
    transporter.sendMail(
      {
        from: "'Zunavish'<pandeyshreyash2201@gmail.com>",
        to: email,
        subject: "E-mail verification for Zunavish",
        html: htmlString,
      },
      (error, info) => {
        if (error) {
          console.log(error);
          cb(false);
          // return false;
        } else {
          console.log("email sent:", info.response);
          cb(true);
          // return true;
        }
      }
    );
  } catch (err) {
    console.log(err);
    cb(false);
    // return false;
  }
};
