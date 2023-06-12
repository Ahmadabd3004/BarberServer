const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => bcrypt.hashSync(password);
const hashCompare = (password, hash) => bcrypt.compareSync(password, hash);

const createToken = (payload) => jwt.sign(payload, "INI RAHASIA");
const getPayload = (token) => jwt.verify(token, "INI RAHASIA");

module.exports = {
  hashPassword,
  hashCompare,
  createToken,
  getPayload,
};
