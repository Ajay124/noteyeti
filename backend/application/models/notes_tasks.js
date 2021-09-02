'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes_tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notes_tasks.belongsTo(models.notes, {
        foreignKey: 'nta_fk_n_id',
        onDelete: 'CASCADE',
      });
    }
  };
  notes_tasks.init({
    nta_uuid: DataTypes.STRING,
    nta_fk_n_id: DataTypes.INTEGER,
    nta_title: DataTypes.STRING,
    nta_ischecked: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes_tasks',
  });
  return notes_tasks;
};