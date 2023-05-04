'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contacts.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    title: DataTypes.STRING,
    email: DataTypes.STRING,
    designation: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'contacts',
  });
  return contacts;
};