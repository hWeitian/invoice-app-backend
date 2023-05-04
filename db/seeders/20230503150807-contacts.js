"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("contacts", [
      {
        first_name: "Alard",
        last_name: "Saint",
        title: "Ms",
        email: "asaint0@google.ca",
        designation: "Operator",
        company_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Wildon",
        last_name: "Boake",
        title: "Dr",
        email: "wboake1@is.gd",
        designation: "Programmer Analyst IV",
        company_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Devina",
        last_name: "Caulfield",
        title: "Dr",
        email: "dcaulfield2@umich.edu",
        designation: "Analyst Programmer",
        company_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Ive",
        last_name: "Jowsey",
        title: "Mrs",
        email: "ijowsey1@adobe.com",
        designation: "Health Coach II",
        company_id: 11,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Hinda",
        last_name: "Stuttard",
        title: "Mr",
        email: "hstuttard4@howstuffworks.com",
        designation: "General Manager",
        company_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Hillard",
        last_name: "Lope",
        title: "Mr",
        email: "hlope5@skyrock.com",
        designation: "Occupational Therapist",
        company_id: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Leonid",
        last_name: "McCathie",
        title: "Mr",
        email: "lmccathie6@blogspot.com",
        designation: "Community Outreach Specialist",
        company_id: 19,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Kory",
        last_name: "Hearl",
        title: "Ms",
        email: "khearl7@qq.com",
        designation: "Project Manager",
        company_id: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Kenton",
        last_name: "Scoates",
        title: "Ms",
        email: "kscoates8@netlog.com",
        designation: "Social Worker",
        company_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "De witt",
        last_name: "Ornils",
        title: "Mrs",
        email: "dornils9@usnews.com",
        designation: "Recruiting Manager",
        company_id: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Nikki",
        last_name: "Chatto",
        title: "Mr",
        email: "nchattoa@cdc.gov",
        designation: "Cost Accountant",
        company_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Hendrick",
        last_name: "Christopher",
        title: "Dr",
        email: "hchristopherb@google.nl",
        designation: "Graphic Designer",
        company_id: 11,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Alie",
        last_name: "Sille",
        title: "Dr",
        email: "asillec@amazon.co.uk",
        designation: "Teacher",
        company_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Jessie",
        last_name: "Okenden",
        title: "Mr",
        email: "jokendend@cmu.edu",
        designation: "Media Manager III",
        company_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Kati",
        last_name: "Tireman",
        title: "Ms",
        email: "ktiremane@sciencedaily.com",
        designation: "VP Marketing",
        company_id: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Muffin",
        last_name: "Whilde",
        title: "Dr",
        email: "mwhildef@sun.com",
        designation: "Paralegal",
        company_id: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Far",
        last_name: "Biaggioni",
        title: "Ms",
        email: "fbiaggionig@house.gov",
        designation: "Librarian",
        company_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Toby",
        last_name: "Face",
        title: "Mrs",
        email: "tfaceh@sakura.ne.jp",
        designation: "Food Chemist",
        company_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Gregorio",
        last_name: "Element",
        title: "Mr",
        email: "gelementi@marketwatch.com",
        designation: "Safety Technician II",
        company_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Lira",
        last_name: "Saffell",
        title: "Ms",
        email: "lsaffellj@macromedia.com",
        designation: "Technical Writer",
        company_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contacts", null, {});
  },
};
