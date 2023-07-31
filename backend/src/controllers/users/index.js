const login = require("./login");
const register = require("./register");
const getIban = require("../banks/getTargetIban");
const getTargetUser = require("./getTargetUser");

module.exports = {
  login,
  register,
  getTargetUser,
  getIban
};
