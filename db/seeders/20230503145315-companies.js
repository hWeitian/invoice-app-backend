"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("companies", [
      {
        name: "BrightStar Solutions",
        billing_address: "123 Main Street, Suite 500, Anytown, USA 12345",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "SwiftTech Industries",
        billing_address: "456 Oak Avenue, Suite 200, Somewhere City, USA 54321",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Crystal Clear Services",
        billing_address: "789 Elm Street, Suite 300, Smallville, USA 67890",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Skyline Innovations",
        billing_address: "321 Maple Drive, Suite 400, Dreamland, USA 98765",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "GoldenGate Enterprises",
        billing_address: "987 Pine Street, Suite 1000, Riverdale, USA 24680",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Silverline Technologies",
        billing_address: "654 Cedar Lane, Suite 800, Harmonyville, USA 13579",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "BlueWave Solutions",
        billing_address:
          "876 Spruce Avenue, Suite 600, Serenity Town, USA 86420",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Redwood Ventures",
        billing_address:
          "543 Birch Road, Suite 700, Tranquility Hills, USA 36912",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Greenfield Industries",
        billing_address: "210 Willow Lane, Suite 900, Blissville, USA 75309",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "PurplePeak Enterprises",
        billing_address: "135 Oakwood Drive, Suite 1200, Joyville, USA 01234",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
