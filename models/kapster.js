"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kapster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kapster.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      photo: DataTypes.STRING,
      barberId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Kapster",
    }
  );
  return Kapster;
};
