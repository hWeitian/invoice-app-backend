"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("contacts", [
      {
        first_name: "Weitian",
        last_name: "Huang",
        title: "Ms",
        email: "huangweitian1@hotmail.com",
        designation: "Admin",
        company_id: 10,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contacts", null, {});
  },
};
