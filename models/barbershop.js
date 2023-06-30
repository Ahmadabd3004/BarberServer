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
      BarberShop.hasMany(models.PhotoBarber, {
        foreignKey: "barberId",
      });
      BarberShop.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  BarberShop.init(
    {
      namaBarberShop: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      alamat: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      kuotaPerjam: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BarberShop",
    }
  );
  return BarberShop;
};
