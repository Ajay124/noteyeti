'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.tags, {
        foreignKey: 'tg_fk_u_id',
        sourceKey:'id',
        as : 'tags'
      });
      users.hasMany(models.notes, {
        foreignKey: 'n_fk_u_id',
        sourceKey:'id',
        as : 'notes'
      });
    }

  };
  users.init({
    u_uuid: DataTypes.STRING,
    u_email: DataTypes.STRING,
    u_password: DataTypes.STRING,
    u_username: DataTypes.STRING,
    u_mobile: DataTypes.STRING,
    u_otp: DataTypes.INTEGER,
    u_device_id: DataTypes.STRING,
    u_device_token: DataTypes.STRING,
    u_device_platform: DataTypes.STRING,
    u_social_paltform: DataTypes.STRING,
    u_socialid: DataTypes.STRING,
    u_issocial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};