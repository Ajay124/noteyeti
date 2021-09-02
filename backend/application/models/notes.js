'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notes.belongsTo(models.users, {
        foreignKey: 'n_fk_u_id',
        onDelete: 'CASCADE',
      });

      notes.hasMany(models.notes_tags, {
        foreignKey: 'nt_fk_n_id',
        sourceKey:'id',
        as : 'notes_tags'
      });

      notes.hasMany(models.notes_images, {
        foreignKey: 'ni_fk_n_id',
        sourceKey:'id',
        as : 'notes_images'
      });

      notes.hasMany(models.notes_tasks, {
        foreignKey: 'nta_fk_n_id',
        sourceKey:'id',
        as : 'notes_tasks'
      });

    }
  };
  notes.init({
    n_uuid: DataTypes.STRING,
    n_fk_u_id: DataTypes.INTEGER,
    n_title: DataTypes.STRING,
    n_description: DataTypes.STRING,
    n_reminder: DataTypes.DATE,
    n_isarchive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};