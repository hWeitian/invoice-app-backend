'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credit_note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  credit_note.init({
    credit_note_num: DataTypes.INTEGER,
    credit_note_date: DataTypes.DATE,
    invoice_id: DataTypes.INTEGER,
    net_amount: DataTypes.DECIMAL,
    usd_gst: DataTypes.DECIMAL,
    sgd_gst: DataTypes.DECIMAL,
    exchange_rate_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'credit_note',
  });
  return credit_note;
};