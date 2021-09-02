'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tags.belongsTo(models.users, {
        foreignKey: 'tg_fk_u_id',
        onDelete: 'CASCADE',
      });
    }
  };
  tags.init({
    tg_uuid: DataTypes.STRING,
    tg_fk_u_id: DataTypes.INTEGER,
    tg_title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tags',
  });
  return tags;
};