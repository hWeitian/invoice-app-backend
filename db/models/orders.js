'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    product_id: DataTypes.INTEGER,
    colour: DataTypes.STRING,
    position: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    sales_note: DataTypes.TEXT,
    cost: DataTypes.DECIMAL,
    insertion_order_id: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER,
    index: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};