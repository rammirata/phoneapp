const axios = require('axios');
const {handleAPIError} = require("../../utils/error");
const {success} = require('../../utils/response')

const accountTransactions = async (req, res, next) => {
    const {actionConfig, authorizationToken, Iban} = req.$scope
  
    let params = {
      iban: Iban,
      bookingDateFrom: actionConfig.bookingDateFrom,
      limit: actionConfig.limit
    };
    
    try {
      const response = await axios({
        method: 'get',
        url: actionConfig.url,
        headers: {
          'Authorization': `Bearer ${authorizationToken}`
        },
        params: params
      });
  
      return success(res, message='Succesfully retrieved transactions', response.data);
    } catch (error) {
      return handleAPIError(res, error);
    }
  }

module.exports = accountTransactions;