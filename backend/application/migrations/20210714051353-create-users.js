'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      u_uuid: {
        type: Sequelize.STRING
      },
      u_email: {
        type: Sequelize.STRING
      },
      u_password: {
        type: Sequelize.STRING
      },
      u_username: {
        type: Sequelize.STRING
      },
      u_mobile: {
        type: Sequelize.STRING
      },
      u_otp: {
        type: Sequelize.INTEGER
      },
      u_device_id: {
        type: Sequelize.STRING
      },
      u_device_token: {
        type: Sequelize.STRING
      },
      u_device_platform: {
        type: Sequelize.ENUM('ANDROID', 'IOS') 
      },
      u_social_paltform: {
        type: Sequelize.ENUM('GOOGLE', 'FACEBOOK') 
      },
      u_socialid: {
        type: Sequelize.STRING
      },
      u_issocial: {
        type: Sequelize.ENUM('0', '1'),
        defaultValue : '0' 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};