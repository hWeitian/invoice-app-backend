"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credit_notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      credit_note_num: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      credit_note_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "invoices",
          key: "id",
        },
      },
      net_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      usd_gst: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      sgd_gst: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      exchange_rate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "exchange_rates",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("credit_notes");
  },
};
