const { DataTypes } = require("sequelize");

const initInvoice = (sequelize) =>
  sequelize.define(
    "invoice",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      invoiceDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL,
      },
      netAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      usdGst: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      sgdGst: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      exchangeRateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amountPaid: {
        type: DataTypes.DECIMAL,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      isDraft: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
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
      modelName: "invoice",
    }
  );

module.exports = initInvoice;
