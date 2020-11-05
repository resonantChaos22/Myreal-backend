const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");

var env = config.db.env;

const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT,
    define: {
      underscored: true,
      schema: env.SCHEMA,
    },
  }
);

const db = {};

db.connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to postgresDB!");
  } catch (err) {
    console.log(err);
    console.log("Could not connect to postgresdb");
  }
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

module.exports = db;
