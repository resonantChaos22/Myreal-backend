const db = require("../../db");
const sequelize = db.sequelize;
const DataTypes = db.Sequelize;

module.exports.Story = sequelize.define(
  "stories",
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
    name: {
      type: DataTypes.STRING,
    },
    URL: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    followers: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
    },
  },
  {
    underscored: true,
  }
);
