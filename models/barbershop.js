"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BarberShop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BarberShop.init(
    {
      namaBarberShop: DataTypes.STRING,
      alamat: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      kuotaPerjam: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BarberShop",
    }
  );
  return BarberShop;
};
