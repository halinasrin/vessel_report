const { DataTypes } = require("sequelize");
const ROLES = require("../utils/roles");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: "users_email_unique" },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM(ROLES.ADMIN,ROLES.FLEET_MANAGER), allowNull: false, defaultValue: ROLES.ADMIN }
  }, {
    tableName: "users"
  });

  User.associate = (models) => {
    User.hasMany(models.Issue, { foreignKey: "userId" });
    User.belongsToMany(models.Vessel, { through: "VesselCrew", as: "vessels", foreignKey: "userId" });
  };

  return User;
};
