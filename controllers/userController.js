const { hashCompare, createToken, hashPassword } = require("../helper/helper");
const { User, BarberShop } = require("../models");
class Controller {
  static async userRegister(req, res) {
    try {
      let { name, email, username, password, gender, isActive, isOwner } =
        req.body;
      const user = await User.create({
        name,
        email,
        username,
        photo: "default.jpg",
        password: hashPassword(password),
        gender,
        isActive,
        isOwner,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { message: "Wrong Username/Password!" };
      }
      const validatePassword = hashCompare(password, user.password);
      if (!validatePassword) {
        throw { message: "Wrong Username/Password!" };
      }
      const payload = {
        id: user.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token, userId: user.id });
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async userUpdate(req, res) {
    try {
      let { name, email, username, password, gender, isActive, userId } =
        req.body;
      const user = await User.findByPk(userId);

      if (!user) {
        throw { message: "User not found!" };
      }
      await user.update({
        name,
        email,
        username,
        password: hashPassword(password),
        gender,
        isActive,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async userDelete(req, res) {
    try {
      let { userId } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        throw { message: "User not found!" };
      }
      await user.update({ isActive: false });
      const barber = await BarberShop.findOne({ where: { userId } });
      if (!barber) {
        throw { message: "BarberShop not found!" };
      }
      await barber.update({ isActive: false });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async uploadPhoto(req, res) {
    try {
      const { userId } = req.body;
      const kapster = await User.update(
        {
          photo: req.file.filename,
        },
        { where: { id: userId } }
      );
      res.status(200).json({ kapster });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
module.exports = Controller;
