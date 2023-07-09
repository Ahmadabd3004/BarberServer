"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingDetail.hasOne(models.BookingHeader, {
        foreignKey: "bookingId",
      });
      BookingDetail.belongsTo(models.Jadwal, {
        foreignKey: "jadwalId",
      });
    }
  }
  BookingDetail.init(
    {
      status: DataTypes.INTEGER,
      jadwalId: DataTypes.STRING,
      urutan: DataTypes.INTEGER,
      tanggalBooking: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BookingDetail",
    }
  );
  return BookingDetail;
};
