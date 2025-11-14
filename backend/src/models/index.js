const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./user.model");
const VesselModel = require("./vessel.model");
const IssueModel = require("./issue.model");

const models = {};

models.User = UserModel(sequelize);
models.Vessel = VesselModel(sequelize);
models.Issue = IssueModel(sequelize);

// Define Many-to-Many through table for vessel crew
models.VesselCrew = sequelize.define("VesselCrew", {}, { tableName: "vessel_crews", timestamps: false });

// Associations (call after models exist)
Object.keys(models).forEach(name => {
  if (models[name].associate) {
    models[name].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
