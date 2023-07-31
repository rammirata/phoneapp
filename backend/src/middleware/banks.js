const config = require("../config/bankAPIs");
const UserBank = require('../models/UserBank.model');
const {badRequest, serverError} = require('../utils/response')


const getIban = (type) => {
  return async (req, res, next) => {
    try {
      let user;
      if (!type) {
        user = req.$scope.user;
      } else if (type === 'target') {
        user = req.$scope.targetUser;
      }
      const userBank = await UserBank.findOne({ userId: user._id });
      if (!userBank) {
        return badRequest(res, message=`No associated bank found for ${type} user`);
      }
      const propertyName = type ? `${type}Iban` : 'Iban';
      req.$scope[propertyName] = userBank.iban;
      
      next();
    } catch (error) {
      return serverError(res, message=`Unknown server error while finding ${type} IBAN`);
    }
  };
};


module.exports = {
  getIban
};