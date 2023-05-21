const { DataTypes } = require("sequelize");

const initMagazine = (sequelize) =>
  sequelize.define(
    "magazine",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      closingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      materialDeadline: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: "magazine",
    }
  );

module.exports = initMagazine;
