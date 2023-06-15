'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingDetail.init({
    bookingId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    jamBooking: DataTypes.STRING,
    urutan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookingDetail',
  });
  return BookingDetail;
};