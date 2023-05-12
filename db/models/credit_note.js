const { DataTypes } = require("sequelize");

const initCreditNote = (sequelize) =>
  sequelize.define(
    "credit_note",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      creditNoteDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "invoices",
          key: "id",
        },
      },
      netAmount: {
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
        references: {
          model: "exchange_rates",
          key: "id",
        },
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
      modelName: "credit_note",
    }
  );

module.exports = initCreditNote;
