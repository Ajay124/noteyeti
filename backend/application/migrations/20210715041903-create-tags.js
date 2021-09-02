'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tg_uuid: {
        type: Sequelize.STRING
      },
      tg_fk_u_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'users',
          key: 'id'
        },
      },
      tg_title: {
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
    await queryInterface.dropTable('tags');
  }
};