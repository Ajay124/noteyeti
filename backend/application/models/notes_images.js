'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notes_images.belongsTo(models.notes, {
        foreignKey: 'ni_fk_n_id',
        onDelete: 'CASCADE',
      });
    }
  };
  notes_images.init({
    ni_uuid: DataTypes.STRING,
    ni_fk_n_id: DataTypes.INTEGER,
    ni_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes_images',
  });
  return notes_images;
};