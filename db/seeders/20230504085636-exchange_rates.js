"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("exchange_rates", [
      {
        date: "2023-01-31",
        rate: 1.3142,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-02-28",
        rate: 1.348,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-03-31",
        rate: 1.327,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-04-30",
        rate: 1.334,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-05-31",
        rate: 1.3539,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-06-30",
        rate: 1.3557,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-07-31",
        rate: 1.3318,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: "2023-08-31",
        rate: 1.3503,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("exchange_rates", null, {});
  },
};
