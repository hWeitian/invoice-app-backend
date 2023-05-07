const { DataTypes } = require("sequelize");

const initOrder = (sequelize) =>
  sequelize.define(
    "order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      magazineId: {
        type: DataTypes.INTEGER,
        references: {
          model: "magazines",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      colour: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      salesNote: {
        type: DataTypes.TEXT,
      },
      cost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      insertionOrderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "insertion_orders",
          key: "id",
        },
      },
      invoiceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "invoices",
          key: "id",
        },
      },
      index: {
        type: DataTypes.INTEGER,
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
      modelName: "order",
    }
  );

module.exports = initOrder;
