const { Sequelize, DataTypes } = require("sequelize");

const db = {};

// The cache configuration
var Redis = require("ioredis");
db.cache = Redis;

db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
db.sequelize = require("../db");
db.models = require("./models");

// Story User relations
db.models.users.hasMany(db.models.stories);
db.models.stories.belongsTo(db.models.users);

// Story Context relations
db.models.contexts.hasMany(db.models.stories);
db.models.stories.belongsTo(db.models.contexts);

// Story Entry relations
db.models.stories.hasMany(db.models.entries);
db.models.entries.belongsTo(db.models.stories);

// db.models.users.belongsToMany(db.models.jobs, { through: "job_applications" });
// db.models.jobs.belongsToMany(db.models.users, { through: "job_applications" });

module.exports = db;
