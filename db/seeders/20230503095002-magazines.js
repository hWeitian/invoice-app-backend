"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("magazines", [
      {
        year: 2022,
        month: "March",
        closing_date: new Date(2022, 2, 13),
        material_deadline: new Date(2022, 2, 23),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2022,
        month: "June",
        closing_date: new Date(2022, 6, 15),
        material_deadline: new Date(2022, 6, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2022,
        month: "September",
        closing_date: new Date(2022, 9, 15),
        material_deadline: new Date(2022, 9, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2022,
        month: "December",
        closing_date: new Date(2022, 12, 15),
        material_deadline: new Date(2022, 12, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2023,
        month: "March",
        closing_date: new Date(2023, 2, 13),
        material_deadline: new Date(2023, 2, 23),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2023,
        month: "June",
        closing_date: new Date(2023, 6, 15),
        material_deadline: new Date(2023, 6, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2023,
        month: "September",
        closing_date: new Date(2023, 9, 15),
        material_deadline: new Date(2023, 9, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2023,
        month: "December",
        closing_date: new Date(2023, 12, 15),
        material_deadline: new Date(2023, 12, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("magazines", null, {});
  },
};
