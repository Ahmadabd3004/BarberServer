"use strict";
const barber = require("../data/barbershop.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    barber.forEach((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("BarberShops", barber);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("BarberShops", null, {});
  },
};
