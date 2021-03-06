'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ni_uuid: {
        type: Sequelize.STRING
      },
      ni_fk_n_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'notes',
          key: 'id'
        },
      },
      ni_url: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('notes_images');
  }
};