'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('videos', [
    {
      name: 'video1',
      url: '/storage/videos/sample-5s.mp4',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'video2',
      url: '/storage/videos/sample-5s.mp4',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'video3',
      url: '/storage/videos/sample-5s.mp4',
      created_at: new Date(),
      updated_at: new Date()
    }
   ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
