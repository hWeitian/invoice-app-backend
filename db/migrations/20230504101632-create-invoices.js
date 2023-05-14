"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "companies",
          key: "id",
        },
      },
      contact_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      due_date: {
        type: Sequelize.DATE,
      },
      discount: {
        type: Sequelize.DECIMAL,
      },
      net_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      total_amount: {
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
      },
      amount_paid: {
        type: Sequelize.DECIMAL,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
      },
      purchase_order: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("invoices");
  },
};
