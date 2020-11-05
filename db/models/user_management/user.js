const db = require("../../db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    URL: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    login_type: {
      type: DataTypes.STRING,
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
    },
    following_users: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
    },
    following_stories: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
    },
  },
  {
    underscored: true,
  }
);
