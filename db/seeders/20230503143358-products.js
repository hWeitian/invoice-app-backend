"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        name: "Full page",
        cost: 3000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Full page spread",
        cost: 7500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Island page",
        cost: 2500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "1/2 page vertical",
        cost: 1500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "1/2 page horizontal",
        cost: 1500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "1/3 page vertical",
        cost: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "1/3 page horizontal",
        cost: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Translation",
        cost: 5000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Supplements",
        cost: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Special Project",
        cost: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
