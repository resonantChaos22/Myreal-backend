require("dotenv").config();

var db = {
  DATABASE_HOST: "db",
  DATABASE_NAME: "myreal-db",
  DATABASE_USERNAME: "dbuser",
  DATABASE_PASSWORD: "eatsleepcode",
  DATABASE_PORT: 5432,
  DATABASE_DIALECT: "postgres",
  NODE_ENV: process.env.NODE_ENV || "development",
  SCHEMA: "public",
};

var config = {
  db: {
    env: db,
  },
  app: {
    jwtKey: process.env.jwtKey || "myreal",
    sessionKey: "SecretSessionKey",
    secretKey: "Myreal",
  },
  google: {
    CLIENT_ID:
      process.env.GOOGLE_CLIENT_ID ||
      "704467432405-9ntdnbep348adavm2bojj1ecq2fa00db.apps.googleusercontent.com",
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  amazon: {
    KEY: process.env.S3_KEY,
    SECRET: process.env.S3_SECRET,
    BUCKET_NAME: "shreyash-test-db1",
  },
};

module.exports = config;
