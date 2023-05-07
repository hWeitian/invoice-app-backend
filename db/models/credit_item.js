const { DataTypes } = require("sequelize");

const initCreditItem = (sequelize) =>
  sequelize.define(
    "credit_item",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      creditNoteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "credit_notes",
          key: "id",
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
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
      modelName: "credit_item",
    }
  );

module.exports = initCreditItem;
