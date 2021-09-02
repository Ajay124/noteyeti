'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes_tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nta_uuid: {
        type: Sequelize.STRING
      },
      nta_fk_n_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'notes',
          key: 'id'
        },
      },
      nta_title: {
        type: Sequelize.STRING
      },
      nta_ischecked: {
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
    await queryInterface.dropTable('notes_tasks');
  }
};