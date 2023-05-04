'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exchange_rates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exchange_rates.init({
    date: DataTypes.DATE,
    rate: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'exchange_rates',
  });
  return exchange_rates;
};