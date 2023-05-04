"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("companies", [
      {
        name: "Cartwright-Durgan",
        billing_address: "1 Valley Edge Way",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Block and Sons",
        billing_address: "773 Tomscot Plaza",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kshlerin and Sons",
        billing_address: "4843 Evergreen Avenue",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Maggio-Zemlak",
        billing_address: "5158 Towne Court",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Koelpin, Bosco and Runolfsson",
        billing_address: "787 Center Drive",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Conn, Gusikowski and Hoppe",
        billing_address: "1536 Ronald Regan Pass",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Barton-Greenfelder",
        billing_address: "0302 Oneill Point",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mueller-Bosco",
        billing_address: "6219 Clemons Place",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Auer and Sons",
        billing_address: "07 Monterey Alley",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Little, Grant and Heidenreich",
        billing_address: "440 Mariners Cove Circle",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bruen-Wiza",
        billing_address: "131 Maple Terrace",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sawayn-Trantow",
        billing_address: "54 Upham Park",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Ebert-Kessler",
        billing_address: "01 Independence Junction",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cassin LLC",
        billing_address: "1941 Miller Avenue",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Douglas-Bartoletti",
        billing_address: "88 Jackson Hill",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Hessel-Crist",
        billing_address: "46286 Onsgard Lane",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kiehn LLC",
        billing_address: "62871 Loeprich Hill",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Walker, Walter and Koelpin",
        billing_address: "3919 Cody Way",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Hoeger, Dietrich and Beer",
        billing_address: "0 Lake View Place",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Schoen-Lynch",
        billing_address: "7425 Anniversary Place",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};
