"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "insertion_orders",
      "updated_ast",
      "updated_at"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "insertion_orders",
      "updated_at",
      "updated_ast"
    );
  },
};
