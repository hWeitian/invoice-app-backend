const { DataTypes } = require("sequelize");

const initOrderRegion = (sequelize) =>
  sequelize.define(
    "orderRegion",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      regionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "regions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
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
      // If table name not specified, sequelize will select the "order_regions" table because underscored is set to true
      tableName: "orderRegions",
      underscored: true,
      modelName: "orderRegion",
    }
  );

module.exports = initOrderRegion;
