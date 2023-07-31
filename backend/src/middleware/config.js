const config = require("../config/bankAPIs");
const AuthSession = require('../models/AuthSession.model');
const {badRequest, serverError} = require('../utils/response')


const findBankConfig = async (req, res, next) => {
  try {
    let { bank, state } = req.query; 

    // if we dont find the bank in the query it may be due to oauth redirect, in that case we need to find on auth session
    if (!bank) {
      const authSession = await AuthSession.findOne({ state: state });
      bank = authSession?.bankName;
    }

    if (!bank || !config[bank]) {
      return badRequest(res, message='Invalid or missing bank');
    }

    req.$scope.bankConfig = config[bank];
    next();
  } catch (error) {
    return serverError(res, message='Unkown server error while finding bank configs');
  }
};


const findActionConfig = (req, res, next) => {
  try {
    const action = req.query.action || req.session.action;
    const { bankConfig } = req.$scope;

    const actionConfig = bankConfig[action];

    if (!actionConfig) {
      return badRequest(res, message='Invalid action');
    }

    req.$scope.actionConfig = actionConfig;
    next();
  } catch (error) {
    return serverError(res, message='Unknown server error when extracting action config');
  }
};


module.exports = {
  findBankConfig,
  findActionConfig
};