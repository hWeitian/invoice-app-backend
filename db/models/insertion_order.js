const { DataTypes } = require("sequelize");

const initInsertionOrder = (sequelize) =>
  sequelize.define(
    "insertion_order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "companies",
          key: "id",
        },
      },
      contactId: {
        type: DataTypes.INTEGER,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      discount: {
        type: DataTypes.DECIMAL,
      },
      usdGst: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      netAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      isSigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isDraft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      gstRateId: {
        type: DataTypes.INTEGER,
        references: {
          model: "gst_rates",
          key: "id",
        },
        allowNull: true,
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
      modelName: "insertion_order",
    }
  );

module.exports = initInsertionOrder;
