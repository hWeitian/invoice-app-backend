"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      SELECT setval('invoices_id_seq', 126, true);
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      SELECT setval('invoices_id_seq', 1, true);
    `);
  },
};
