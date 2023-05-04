"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("magazines", [
      {
        year: 2019,
        month: "March",
        closing_date: new Date(2019, 2, 13),
        material_deadline: new Date(2019, 2, 23),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2019,
        month: "June",
        closing_date: new Date(2019, 6, 15),
        material_deadline: new Date(2019, 6, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2019,
        month: "September",
        closing_date: new Date(2019, 9, 15),
        material_deadline: new Date(2019, 9, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2019,
        month: "December",
        closing_date: new Date(2019, 12, 15),
        material_deadline: new Date(2019, 12, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2020,
        month: "March",
        closing_date: new Date(2020, 2, 13),
        material_deadline: new Date(2020, 2, 23),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2020,
        month: "June",
        closing_date: new Date(2020, 6, 15),
        material_deadline: new Date(2020, 6, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2020,
        month: "September",
        closing_date: new Date(2020, 9, 15),
        material_deadline: new Date(2020, 9, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        year: 2020,
        month: "December",
        closing_date: new Date(2020, 12, 15),
        material_deadline: new Date(2020, 12, 25),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("magazines", null, {});
  },
};
