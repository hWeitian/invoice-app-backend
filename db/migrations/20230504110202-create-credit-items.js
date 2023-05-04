"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credit_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      credit_note_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "credit_notes",
          key: "id",
        },
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("credit_items");
  },
};
