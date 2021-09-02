'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      n_uuid: {
        type: Sequelize.STRING
      },
      n_fk_u_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'users',
          key: 'id'
        },
      },
      n_title: {
        type: Sequelize.STRING
      },
      n_description: {
        type: Sequelize.STRING
      },
      n_reminder: {
        type: Sequelize.DATE
      },
      n_isarchive: {
        type: Sequelize.ENUM('0','1'),
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
    await queryInterface.dropTable('notes');
  }
};