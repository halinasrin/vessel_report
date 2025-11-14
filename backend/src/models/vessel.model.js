const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Vessel = sequelize.define("Vessel", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    imoNumber: { type: DataTypes.STRING, allowNull: false, unique: 'vessel_unique_name' },
    flag: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM("Active", "Under Maintenance"), defaultValue: "Active" },
    lastInspection: { type: DataTypes.DATE }
  }, {
    tableName: "vessels"
  });

  Vessel.associate = (models) => {
    Vessel.hasMany(models.Issue, {  as: "issues", foreignKey: "vesselId" });
    Vessel.belongsToMany(models.User, { through: "VesselCrew", as: "crew", foreignKey: "vesselId" });
  };

  return Vessel;
};
