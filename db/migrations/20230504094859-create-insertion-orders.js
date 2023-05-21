"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("insertion_orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "contacts",
          key: "id",
        },
      },
      discount: {
        type: Sequelize.DECIMAL,
      },
      usd_gst: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      net_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      total_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      is_signed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_draft: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_ast: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("insertion_orders");
  },
};
