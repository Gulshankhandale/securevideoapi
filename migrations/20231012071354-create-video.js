'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      url: {
        type: Sequelize.STRING,
        allowNull:false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull:false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull:true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull:true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('videos');
  }
};