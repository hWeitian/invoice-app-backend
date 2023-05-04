'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoices.init({
    company_id: DataTypes.INTEGER,
    contact_id: DataTypes.INTEGER,
    invoice_num: DataTypes.INTEGER,
    invoice_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    discount: DataTypes.DECIMAL,
    net_amount: DataTypes.DECIMAL,
    usd_gst: DataTypes.DECIMAL,
    sgd_gst: DataTypes.DECIMAL,
    exchange_rate_id: DataTypes.INTEGER,
    amount_paid: DataTypes.DECIMAL,
    admin_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoices',
  });
  return invoices;
};