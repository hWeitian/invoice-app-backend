'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credit_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  credit_item.init({
    credit_note_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'credit_item',
  });
  return credit_item;
};