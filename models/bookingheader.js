"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingHeader.belongsTo(models.BookingDetail, {
        foreignKey: "bookingId",
      });
      BookingHeader.belongsTo(models.BarberShop, {
        foreignKey: "barberId",
      });
    }
  }
  BookingHeader.init(
    {
      barberId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      bookingId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "BookingHeader",
    }
  );
  return BookingHeader;
};
