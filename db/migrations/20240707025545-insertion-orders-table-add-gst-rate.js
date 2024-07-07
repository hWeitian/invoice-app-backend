"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("insertion_orders", "gst_rate_id", {
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
    await queryInterface.removeColumn("insertion_orders", "gst_rate_id");
  },
};
