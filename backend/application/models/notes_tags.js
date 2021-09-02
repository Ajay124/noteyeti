'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notes_tags.belongsTo(models.notes, {
        foreignKey: 'nt_fk_n_id',
        onDelete: 'CASCADE',
      });

      notes_tags.belongsTo(models.tags, {
        foreignKey: 'nt_fk_tg_id',
        onDelete: 'CASCADE',
      });
    }
  };
  notes_tags.init({
    nt_uuid: DataTypes.STRING,
    nt_fk_n_id: DataTypes.INTEGER,
    nt_fk_tg_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'notes_tags',
  });
  return notes_tags;
};