const { DataTypes } = require("sequelize");

const initInvoicePayment = (sequelize) =>
  sequelize.define(
    "invoicePayment",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "invoices",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "payments",
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
      // If table name not specified, sequelize will select the "invoice_payments" table because underscored is set to true
      tableName: "invoicePayments",
      sequelize,
      underscored: true,
      modelName: "invoicePayment",
    }
  );

module.exports = initInvoicePayment;
