const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Issue = sequelize.define("Issue", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    priority: { type: DataTypes.ENUM("High", "Medium", "Low"), defaultValue: "Medium" },
    status: { type: DataTypes.ENUM("Open", "In Progress", "Closed"), defaultValue: "Open" },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: "issues",
    updatedAt: false
  });

  Issue.associate = (models) => {
    Issue.belongsTo(models.Vessel, { foreignKey: "vesselId" });
    Issue.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Issue;
};
