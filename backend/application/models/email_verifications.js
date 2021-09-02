'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class email_verifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  email_verifications.init({
    ev_uuid: DataTypes.STRING,
    ev_email: DataTypes.STRING,
    ev_otp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'email_verifications',
  });
  return email_verifications;
};