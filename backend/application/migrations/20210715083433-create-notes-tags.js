'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nt_uuid: {
        type: Sequelize.STRING
      },
      nt_fk_n_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'notes',
          key: 'id'
        },
      },
      nt_fk_tg_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:  'tags',
          key: 'id'
        },
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
    await queryInterface.dropTable('notes_tags');
  }
};