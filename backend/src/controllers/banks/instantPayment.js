const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {handleAPIError} = require("../../utils/error");
const {success} = require('../../utils/response')

const instantPayment = async (req, res, next) => {
  const { proofToken, authorizationToken, actionConfig, Iban } = req.$scope;
  
  let payload = req.body
  payload = JSON.stringify(payload);
  payload = payload.replace('{debtorIban}', Iban);
  payload = JSON.parse(payload);

  try {
    const response = await axios.post(actionConfig.url, payload, {
      headers: {
        'Authorization': `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
        'idempotency-id': uuidv4(),
        'OTP': proofToken
      }
    });

    return success(res, message='Successfully submitted transaction', response.data);
  } catch (error) {
    handleAPIError(res, error);
  }
}

module.exports = instantPayment;