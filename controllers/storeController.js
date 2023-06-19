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

class Controller {
  // Data Barber

  static async barberGetAllData(req, res) {
    try {
      const barber = await BarberShop.findAll();
      res.status(200).json(barber);
    } catch (error) {
      res.status(500).json({ message: "Error!" });
    }
  }
  static async barberCreate(req, res) {
    try {
      let { namaBarberShop, alamat, userId, kuotaPerjam, isActive } = req.body;
      const store = await BarberShop.create({
        namaBarberShop,
        alamat,
        userId,
        kuotaPerjam,
        isActive,
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
      let { namaBarberShop, alamat, barberId, kuotaPerjam } = req.body;
      const barber = await BarberShop.findByPk(barberId);

      if (!barber) {
        throw { message: "BarberShop not found!" };
      }
      await barber.update({
        namaBarberShop,
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
      const { barberId } = req.body;
      const reviews = await Review.findAll({ where: { barberId } });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async barberCreateReviews(req, res) {
    try {
      const { message, rating, barberId, userId } = req.body;
      const review = await Review.create({ message, rating, barberId, userId });

      res.status(201).json(review);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // Layanan

  static async barberGetLayanan(req, res) {
    try {
      const { barberId } = req.body;
      const layanan = await Layanan.findAll({ where: { barberId } });
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
      const { barberId } = req.body;
      const kapster = await Kapster.findAll({ where: { barberId } });
      res.status(200).json(kapster);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async createKapster(req, res) {
    try {
      const { name, gender, barberId } = req.body;
      // const appDir = dirname(require.main.filename);
      // console.log(__dirname);
      // console.log(req.body);
      // console.log("masuk sni oi");
      // console.log(req.file);
      // console.log(name);
      // res.send("masuk kapster");
      // res.sendFile(appDir + "/uploads/img1.jpg");
      // res.sendFile(appDir + "/uploads/img2.jpg");
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
      const { name, gender, barberId } = req.body;
      const kapster = await Kapster.create({
        name,
        gender,
        photo: req.file.filename,
        barberId,
      });
      res.status(200).json({ kapster });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //Jadwal
  static async getJadwalBarber(req, res) {
    try {
      const { barberId } = req.body;
      const jadwal = await Jadwal.findAll({ where: { barberId } });
      res.status(200).json({ jadwal });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async createJadwalBarber(req, res) {
    try {
      const { jadwal, barberId } = req.body;
      console.log(jadwal);
      const newJadwal = jadwal.map((e) => {
        return {
          jamOperasional: e,
          barberId,
        };
      });
      await Jadwal.bulkCreate(newJadwal);
      res.status(200).json({ newJadwal });
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

  static async bookingBarber(req, res) {
    try {
      const { barberId, userId, jamBooking, urutan } = req.body;
      const booking = await BookingHeader.create({
        barberId,
        userId,
        isActive: true,
      });
      const bookingDt = await BookingDetail.create({
        bookingId: booking.id,
        status: 0,
        jamBooking,
        urutan,
      });
      res.status(201).json({ bookingDt });
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
    bookingDt2.update({ status }, { where: { id: bookingId } });
    res.status(200).json({ bookingDt2 });
    try {
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
