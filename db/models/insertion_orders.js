'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class insertion_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  insertion_orders.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    company_id: DataTypes.INTEGER,
    contact_id: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL,
    usd_gst: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL,
    is_signed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'insertion_orders',
  });
  return insertion_orders;
};