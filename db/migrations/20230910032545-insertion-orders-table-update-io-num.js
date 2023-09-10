"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      SELECT setval('insertion_orders_id_seq', 187, true);
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      SELECT setval('insertion_orders_id_seq', 1, true);
    `);
  },
};
