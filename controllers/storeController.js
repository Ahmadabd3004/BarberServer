const { BarberShop, User, Review, Layanan } = require("../models");

class Controller {
  static async barberGetAllData(req, res) {
    try {
      const barber = await BarberShop.findAll();
      res.status(200).json(barber);
    } catch (error) {
      res.status(400).json({ message: "Error!" });
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
      res.status(400).json({ message: "Error!" });
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
      res.status(400).json(error);
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
      res.status(400).json(error);
    }
  }
  static async barberGetReviews(req, res) {
    try {
      const { barberId } = req.body;
      const reviews = await Review.findAll({ where: { barberId } });
      res.status(200).json(reviews);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async barberCreateReviews(req, res) {
    try {
      const { message, rating, barberId, userId } = req.body;
      const review = await Review.create({ message, rating, barberId, userId });

      res.status(201).json(review);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async barberGetLayanan(req, res) {
    try {
      const { barberId } = req.body;
      const layanan = await Layanan.findAll({ where: { barberId } });
      res.status(200).json(layanan);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async barberCreateLayanan(req, res) {
    try {
      console.log("coba");
      console.log(req.body);
      res.send(req.body);
      // const { namaLayanan, harga, deskripsi, barberId } = req.body;
      // const layanan = await Layanan.create({
      //   namaLayanan,
      //   harga,
      //   deskripsi,
      //   barberId,
      // });
      // res.status(201).json(layanan);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async barber(req, res) {
    try {
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = Controller;
