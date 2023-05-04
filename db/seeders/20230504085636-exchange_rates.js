"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("exchange_rates", [
      {
        date: new Date(2019, 1, 31),
        rate: 1.3465,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2019, 2, 28),
        rate: 1.3487,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2019, 4, 30),
        rate: 1.362,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2020, 2, 28),
        rate: 1.3977,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2020, 5, 31),
        rate: 1.4143,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2023, 1, 31),
        rate: 1.3142,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2023, 2, 28),
        rate: 1.348,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2023, 3, 31),
        rate: 1.327,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        date: new Date(2023, 4, 30),
        rate: 1.334,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("exchange_rates", null, {});
  },
};
