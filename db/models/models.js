const db = {};
const sequelize = require("../db").sequelize;
const DataTypes = require("../db").Sequelize;
db.sequelize = sequelize;

//User Management
db.users = require("./user_management/user").User;

// Story management
db.stories = require("./story_management/story").Story;
db.entries = require("./story_management/entry").Entry;
db.contexts = require("./story_management/context").Context;

module.exports = db;
