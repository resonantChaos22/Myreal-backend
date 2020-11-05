const db = require("../../db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Entry = sequelize.define(
  "entries",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    desc: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    URL: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    underscored: true,
  }
);
