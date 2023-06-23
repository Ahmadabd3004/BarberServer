"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhotoBarber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhotoBarber.belongsTo(models.BarberShop, {
        foreignKey: "barberId",
      });
    }
  }
  PhotoBarber.init(
    {
      photo: DataTypes.STRING,
      barberId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PhotoBarber",
    }
  );
  return PhotoBarber;
};
