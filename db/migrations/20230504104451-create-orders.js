"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      magazine_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "magazines",
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      colour: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
      },
      sales_note: {
        type: Sequelize.TEXT,
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      insertion_order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "insertion_orders",
          key: "id",
        },
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "invoices",
          key: "id",
        },
      },
      index: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("orders");
  },
};
