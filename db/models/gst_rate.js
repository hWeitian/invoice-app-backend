const { DataTypes } = require("sequelize");

const initGstRate = (sequelize) =>
  sequelize.define(
    "gst_rate",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      rate: {
        type: DataTypes.DECIMAL,
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
      modelName: "gst_rate",
    }
  );

module.exports = initGstRate;
