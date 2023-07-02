const {
  BarberShop,
  User,
  Review,
  Layanan,
  Kapster,
  Jadwal,
  PhotoBarber,
  BookingHeader,
  BookingDetail,
} = require("../models");
const { dirname } = require("path");
const { Op } = require("sequelize");
const moment = require("moment");
const TODAY_START = moment().format("YYYY-MM-DD 00:00");
const NOW = moment().format("YYYY-MM-DD 23:59");

class Controller {
  // Data Barber

  static async barberGetAllData(req, res) {
    try {
      let barber = await BarberShop.findAll({
        include: [
          {
            model: PhotoBarber,
            limit: 1,
          },
        ],
      });
      res.status(200).json(barber);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error!" });
    }
  }
  static async barberGetDetailData(req, res) {
    try {
      const { id } = req.params;
      const barber = await BarberShop.findAll(
        {
          include: [
            {
              model: PhotoBarber,
            },
          ],
        },
        { where: { id } }
      );
      res.status(200).json(barber);
    } catch (error) {
      res.status(500).json({ message: "Error!" });
    }
  }
  static async barberCreate(req, res) {
    try {
      let { namaBarberShop, deskripsi, alamat, userId, kuotaPerjam, isActive } =
        req.body;
      const store = await BarberShop.create({
        namaBarberShop,
        deskripsi,
        alamat,
        userId,
        kuotaPerjam,
        isActive,
        rating: 0,
      });
      if (store) {
        await User.update({ isOwner: true }, { where: { id: userId } });
      }
      res.status(201).json(store);
    } catch (error) {
      res.status(500).json({ message: "Error!" });
    }
  }
  static async barberUpdate(req, res) {
    try {
      let { namaBarberShop, alamat, deskripsi, barberId, kuotaPerjam } =
        req.body;
      const barber = await BarberShop.findByPk(barberId);

      if (!barber) {
        throw { message: "BarberShop not found!" };
      }
      await barber.update({
        namaBarberShop,
        deskripsi,
        alamat,
        kuotaPerjam,
      });
      res.status(200).json(barber);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async barberDelete(req, res) {
    try {
      let { barberId } = req.body;
      const barber = await BarberShop.findByPk(barberId);

      if (!barber) {
        throw { message: "BarberShop not found!" };
      }
      await barber.update({ isActive: false });
      res.status(200).json(barber);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Reviews

  static async barberGetReviews(req, res) {
    try {
      const { id } = req.params;
      const reviews = await Review.findAll(
        {
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        },
        { where: { barberId: id } }
      );
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async barberCreateReviews(req, res) {
    try {
      const { message, rating, barberId, userId } = req.body;
      const review = await Review.create({ message, rating, barberId, userId });
      const reviews = await Review.findAll({ where: { barberId } });
      let totalRating = 0;
      reviews.forEach((e) => {
        totalRating += e.rating;
      });
      const barber = await BarberShop.findByPk(barberId);
      console.log(barber);
      await barber.update({ rating: totalRating / reviews.length });
      console.log("lewat sini");
      res.status(201).json(review);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // Layanan

  static async barberGetLayanan(req, res) {
    try {
      const { id } = req.params;
      const layanan = await Layanan.findAll({ where: { id } });
      res.status(200).json(layanan);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async barberCreateLayanan(req, res) {
    try {
      const { namaLayanan, harga, deskripsi, barberId } = req.body;
      const layanan = await Layanan.create({
        namaLayanan,
        harga,
        deskripsi,
        barberId,
      });
      res.status(201).json(layanan);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Kapster

  static async getKapster(req, res) {
    try {
      const { id } = req.params;
      const kapster = await Kapster.findAll({ where: { barberId: id } });
      res.status(200).json(kapster);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async createKapster(req, res) {
    try {
      const { name, gender, barberId } = req.body;
      const kapster = await Kapster.create({
        name,
        gender,
        photo: req.file.filename,
        barberId,
      });
      res.status(201).json({ kapster });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateKapster(req, res) {
    try {
      const { name, gender, barberId, kapsterId } = req.body;
      const kapster = await Kapster.update(
        {
          name,
          gender,
          photo: req.file.filename,
          barberId,
        },
        { where: { id: kapsterId } }
      );
      res.status(200).json({ kapster });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //Jadwal
  static async getJadwalBarber(req, res) {
    try {
      const { id } = req.params;
      const { tanggalBooking } = req.body;
      const jadwals = await Jadwal.findAll({
        include: [
          {
            model: BookingDetail,
            where: { tanggalBooking },
            required: false,
          },
        ],
        where: { barberId: id },
      });
      const barber = await BarberShop.findByPk(id);
      const kuota = barber.kuotaPerjam;
      const newJadwals = jadwals.map((e) => {
        if (e.BookingDetails.length >= kuota) {
          e.dataValues.isAvailable = false;
        } else {
          e.dataValues.isAvailable = true;
        }
        return e;
      });
      res.status(200).json(newJadwals);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async createJadwalBarber(req, res) {
    try {
      const { jadwal, barberId } = req.body;
      const newJadwal = jadwal.map((e) => {
        return {
          jamOperasional: e,
          barberId,
        };
      });
      await Jadwal.bulkCreate(newJadwal);
      res.status(200).json({ newJadwal });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getPhotoBarber(req, res) {
    try {
      const { id } = req.params;
      const photos = await PhotoBarber.findAll({ where: { barberId: id } });
      res.status(200).json({ photos });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async createPhotoBarber(req, res) {
    try {
      const { barberId } = req.body;
      // const appDir = dirname(require.main.filename);
      // console.log(__dirname);
      // console.log(req.body);
      // console.log("masuk sni oi");
      // console.log(req.files);
      const photos = req.files.map((e) => {
        return {
          photo: e.filename,
          barberId,
        };
      });
      await PhotoBarber.bulkCreate(photos);
      res.status(200).json({ photoBarber: photos });
      // res.status(201).json({ photos });
      // console.log(name);
      // res.send("masuk kapster");
      // res.sendFile(appDir + "/uploads/img1.jpg");
      // res.sendFile(appDir + "/uploads/img2.jpg");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //Booking
  static async getBookingByBarber(req, res) {
    try {
      const { id } = req.params;
      const bookingData = await BookingHeader.findAll(
        {
          include: [
            {
              model: BookingDetail,
            },
            {
              model: BarberShop,
              include: {
                model: User,
              },
            },
          ],
        },
        {
          where: { barberId: id },
        }
      );
      res.status(200).json({ bookingData });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getBookingByUser(req, res) {
    console.log("masuk sini");
    try {
      const { userId } = req.params;
      const bookingData = await BookingHeader.findAll({
        where: { userId },
        include: [
          {
            model: BookingDetail,
          },
          {
            model: BarberShop,
            include: {
              model: User,
            },
          },
        ],
      });
      res.status(200).json({ bookingData });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async bookingBarber(req, res) {
    try {
      const { barberId, userId, jadwalId, tanggalBooking } = req.body;
      const barber = await BarberShop.findByPk(barberId);
      if (!barber) {
        throw { message: "Barber not found!" };
      }

      const isBooked = await BookingHeader.findAll({
        include: [
          {
            model: BookingDetail,
            where: { jadwalId, tanggalBooking },
          },
        ],
        where: { barberId, userId },
      });
      if (isBooked.length) {
        res.status(200).json({
          msg: "Sudah pernah booking!",
        });
      } else {
        const kuotaPerjam = barber.kuotaPerjam;
        // console.log("error disini");
        const totalBooking = await BookingDetail.findAll({
          include: [
            {
              model: BookingHeader,
              where: { barberId },
            },
          ],
          where: { jadwalId, tanggalBooking },
        });
        // console.log(totalBooking);
        // res.send(totalBooking);
        if (totalBooking.length < kuotaPerjam) {
          const bookingDt = await BookingDetail.create({
            status: 0,
            jadwalId,
            urutan: totalBooking.length + 1,
            tanggalBooking,
          });
          await BookingHeader.create({
            barberId,
            userId,
            bookingId: bookingDt.id,
            isActive: true,
          });
          res.status(201).json({ bookingDt });
        } else {
          res.status(200).json({
            msg: "Kuota telah penuh!",
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async bookingUpdate(req, res) {
    const { bookingId, status } = req.body;
    const bookingDt2 = await BookingDetail.findByPk(bookingId);
    if (!bookingDt2) {
      throw { message: "Booking not found!" };
    }
    await bookingDt2.update({ status }, { where: { id: bookingId } });
    res.status(200).json({ bookingDt2 });
    try {
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //Statistik
  static async barberGetStatistic(req, res) {
    try {
      const { id } = req.params;
      const photoBarber = await PhotoBarber.findAll({
        where: { barberId: id },
      });
      const barber = await BarberShop.findByPk(id);
      const totalBookingToday = await BookingDetail.findAll({
        include: [
          {
            model: BookingHeader,
            attributes: ["barberId"],
            where: { barberId: id },
          },
        ],
        where: {
          tanggalBooking: {
            [Op.between]: [TODAY_START, NOW],
          },
        },
      });
      const totalBookingWaitingListToday = await BookingDetail.findAll({
        where: {
          tanggalBooking: {
            [Op.between]: [TODAY_START, NOW],
          },
          status: 0,
        },
      });
      // console.log(date);
      res.status(200).json({
        photoBarber,
        totalBookingToday: totalBookingToday.length,
        totalBookingWaitingListToday: totalBookingWaitingListToday.length,
        rating: barber.rating,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // static async createKapster(req, res) {
  //   try {
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }
}

module.exports = Controller;
