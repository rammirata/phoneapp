const users = require("./users");
const validateParams = require('./validateParams');
const banks = require('./banks');
const auth = require('./auth');
const config = require('./config')

module.exports = {
  users,
  validateParams,
  banks,
  auth,
  config
};