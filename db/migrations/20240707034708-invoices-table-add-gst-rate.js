"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("invoices", "gst_rate_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "gst_rates",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("invoices", "gst_rate_id");
  },
};
