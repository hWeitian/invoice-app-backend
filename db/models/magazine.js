"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class magazine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  magazine.init(
    {
      year: DataTypes.INTEGER,
      month: DataTypes.STRING,
      closingDate: DataTypes.DATE,
      materialDeadline: DataTypes.DATE,
    },
    {
      sequelize,
      underscored: true,
      modelName: "magazine",
    }
  );
  return magazine;
};
