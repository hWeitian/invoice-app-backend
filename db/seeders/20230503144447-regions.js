"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("regions", [
      {
        name: "Asia-Pacific",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "India",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Korea",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "China",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("regions", null, {});
  },
};
